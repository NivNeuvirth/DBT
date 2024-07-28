const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser"); // Import body-parser
const bcrypt = require("bcrypt");
const db = require("./db"); // Assuming db.js is in the same directory

const app = express();
const port = 3005; // Ensure this matches your server port

app.use(cors());
app.use(bodyParser.json()); // Use body-parser to parse JSON bodies

// Example endpoint to fetch data
app.get("/api/data", async (req, res) => {
  try {
    const query =
      "SELECT title, subtitle, address, cords FROM atlas_obscura_attractions"; // Replace with your table name
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
  const { name, email, gender, phoneNumber, dateOfBirth, password } = req.body;

  try {
    // Check if the email already exists
    const emailCheckQuery = "SELECT * FROM users WHERE email = $1";
    const emailCheckResult = await db.query(emailCheckQuery, [email]);

    if (emailCheckResult.rows.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user
    const query =
      "INSERT INTO users (name, email, gender, phone_number, date_of_birth, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    const values = [
      name,
      email,
      gender,
      phoneNumber,
      dateOfBirth,
      hashedPassword,
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
    // Check if the email exists
    const userQuery = "SELECT * FROM users WHERE email = $1";
    const userResult = await db.query(userQuery, [email]);

    if (userResult.rows.length === 0) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const user = userResult.rows[0];

    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Respond with success
    res
      .status(200)
      .json({ message: "Login successful", user: { name: user.name } });
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
