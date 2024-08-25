const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("./db");

const app = express();
const port = process.env.PORT || 3005;

const SECRET_KEY = "your_secret_key";
const REFRESH_SECRET_KEY = "your_refresh_secret_key";

app.use(cors());
app.use(bodyParser.json());

// Generate Access Token
const generateAccessToken = (user) => {
  return jwt.sign(user, SECRET_KEY, { expiresIn: "15m" });
};

// Generate Refresh Token
const generateRefreshToken = (user) => {
  const refreshToken = jwt.sign(user, REFRESH_SECRET_KEY, { expiresIn: "7d" });
  return refreshToken;
};

// Middleware to verify access token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Middleware to check admin role
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Forbidden: Admins only" });
  }
};

app.get("/api/data", async (req, res) => {
  try {
    const query = `
      SELECT 
        "ID", 
        "Attraction Category", 
        "Attraction Name", 
        "Attraction City", 
        "Top Choice?", 
        "Attraction Address", 
        "Attraction Phone", 
        "Attraction Site", 
        "Attraction Description", 
        "Image Link" 
      FROM lonely_planet_attractions;
    `;

    const data = (await db.query(query)).rows;

    if (data.length === 0) {
      res.status(404).json({ error: "No data found" });
    } else {
      res.json(data);
    }
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to register a new user
app.post("/api/users", async (req, res) => {
  const { name, email, gender, phoneNumber, dateOfBirth, password, role } =
    req.body;

  try {
    const emailCheckQuery = "SELECT * FROM users WHERE email = $1";
    const emailCheckResult = await db.query(emailCheckQuery, [email]);

    if (emailCheckResult.rows.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const query =
      "INSERT INTO users (name, email, gender, phone_number, date_of_birth, password, role) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
    const values = [
      name,
      email,
      gender,
      phoneNumber,
      dateOfBirth,
      hashedPassword,
      role || "user",
    ];

    const result = await db.query(query, values);
    res
      .status(201)
      .send({ message: "User registered successfully", user: result.rows[0] });
  } catch (err) {
    if (err.code === "23505" && err.constraint === "users_email_key") {
      res.status(400).json({ error: "Email already exists" });
    } else {
      console.error("Error executing query", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// Endpoint to login a user
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userQuery = "SELECT * FROM users WHERE email = $1";
    const userResult = await db.query(userQuery, [email]);

    if (userResult.rows.length === 0) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const user = userResult.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const accessToken = generateAccessToken({ id: user.id, role: user.role });
    const refreshToken = generateRefreshToken({ id: user.id, role: user.role });
    res.status(200).json({
      accessToken,
      refreshToken,
      user: { name: user.name, role: user.role },
    });
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to refresh the token
app.post("/api/refresh-token", (req, res) => {
  const { token } = req.body;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, REFRESH_SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);

    const accessToken = generateAccessToken({ id: user.id, role: user.role });
    res.json({ accessToken });
  });
});

// Protected Route
app.get("/api/protected", authenticateToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

// Admin Protected Route to delete an attraction
app.delete(
  "/api/attractions/:id",
  authenticateToken,
  isAdmin,
  async (req, res) => {
    const { id } = req.params;

    try {
      const deleteQuery = "DELETE FROM atlas_obscura_attractions WHERE id = $1";
      await db.query(deleteQuery, [id]);
      res.status(200).json({ message: "Attraction deleted successfully" });
    } catch (err) {
      console.error("Error executing query", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Endpoint to fetch all users (admin only)
app.get("/api/users", authenticateToken, isAdmin, async (req, res) => {
  try {
    const query = "SELECT id, name, email, role FROM users";
    const users = (await db.query(query)).rows;

    if (users.length === 0) {
      res.status(404).json({ error: "No users found" });
    } else {
      res.json(users);
    }
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to update a user (admin only)
app.put("/api/users/:id", authenticateToken, isAdmin, async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;

  try {
    const query =
      "UPDATE users SET name = $1, email = $2, role = $3 WHERE id = $4 RETURNING *";
    const values = [name, email, role, id];

    const result = await db.query(query, values);

    if (result.rows.length === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to get list of user favorites
app.get("/api/favorites", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const query = `
      SELECT attraction_id FROM user_favorites WHERE user_id = $1
    `;
    const favorites = (await db.query(query, [userId])).rows.map(
      (row) => row.attraction_id
    );
    res.json(favorites);
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to add or remove an attraction from a user's favorites
// After updating favorites, ensure the backend returns an array
app.post("/api/favorites", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { attractionId } = req.body;

  try {
    const checkQuery = `
      SELECT * FROM user_favorites WHERE user_id = $1 AND attraction_id = $2
    `;
    const result = await db.query(checkQuery, [userId, attractionId]);

    if (result.rows.length > 0) {
      // Remove from favorites if it already exists
      const deleteQuery = `
        DELETE FROM user_favorites WHERE user_id = $1 AND attraction_id = $2
      `;
      await db.query(deleteQuery, [userId, attractionId]);
    } else {
      // Add to favorites if it does not exist
      const insertQuery = `
        INSERT INTO user_favorites (user_id, attraction_id) VALUES ($1, $2)
      `;
      await db.query(insertQuery, [userId, attractionId]);
    }

    // Query for updated list of favorites
    const updatedFavoritesQuery = `
      SELECT attraction_id FROM user_favorites WHERE user_id = $1
    `;
    const updatedFavorites = (
      await db.query(updatedFavoritesQuery, [userId])
    ).rows.map((row) => row.attraction_id);

    // Return the updated list of favorites
    res.json(updatedFavorites);
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// New endpoint to fetch user's favorite attractions with full details
app.get("/api/user-favorites", authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const query = `
      SELECT la.*
      FROM user_favorites uf
      JOIN lonely_planet_attractions la ON uf.attraction_id = la."ID"
      WHERE uf.user_id = $1
    `;
    const favorites = (await db.query(query, [userId])).rows;

    res.json(favorites);
  } catch (err) {
    console.error("Error fetching user favorites", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/search", async (req, res) => {
  const { query } = req.query;

  try {
    const searchQuery = `%${query}%`.toLowerCase(); // For case-insensitive search
    const dbQuery = `
      SELECT * 
      FROM lonely_planet_attractions 
      WHERE LOWER("Attraction Name") LIKE $1
         OR LOWER("Attraction City") LIKE $1;
    `;

    const results = await db.query(dbQuery, [searchQuery]);
    res.json(results.rows);
  } catch (err) {
    console.error("Error executing search query", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
