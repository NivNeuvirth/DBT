const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./db");

const app = express();
const port = 3005;

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

// // Example endpoint to fetch data with authentication
// app.get("/api/data", authenticateToken, async (req, res) => {
//   try {
//     const query =
//       "SELECT id, title, subtitle, address, cords FROM atlas_obscura_attractions";
//     const data = (await db.query(query)).rows;

//     if (data.length === 0) {
//       res.status(404).json({ error: "No data found" });
//     } else {
//       res.json(data);
//     }
//   } catch (err) {
//     console.error("Error executing query", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// Example endpoint to fetch data (public)
app.get("/api/data", async (req, res) => {
  try {
    const query =
      "SELECT id, title, subtitle, address, cords FROM atlas_obscura_attractions";
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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
