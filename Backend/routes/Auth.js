const bcrypt = require("bcrypt");
const { pool } = require("../db");
const jwtGenerator = require("../utils/jwtGenerator");

const registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (fullname, email, password) VALUES ($1, $2, $3) RETURNING *",
      [fullname, email, hashedPassword]
    );

    const newUser = result.rows[0];

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error registering user:", error);

    let errorMessage = "Internal Server Error";

    // Check for specific error conditions and provide more detailed error messages
    if (error.code === "23505") {
      // Unique constraint violation (e.g., duplicate email)
      errorMessage = "Email already in use. Please choose a different email.";
    } else if (error.message.includes("null value")) {
      // Example: Check for specific database constraint violation
      errorMessage = "Invalid data. Please provide all required information.";
    }

    res.status(500).json({
      success: false,
      message: errorMessage,
    });
  }
};

// User Login
const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rowCount === 0) {
      throw new Error("Email not found");
    }

    // Compare password
    const isValidPassword = await bcrypt.compare(
      password,
      user.rows[0].password
    );
    if (!isValidPassword) {
      throw new Error("Incorrect password!");
    }

    // Generate JWT token
    const token = jwtGenerator(user.rows[0].id);
    const user_id = user.rows[0].id;

    res.status(200).json({
      message: "Login successful",
      token,
      userId: user_id,
      email: email,
    });
  } catch (error) {
    console.error(error);
    if (error.message === "Email not found") {
      res.status(401).json({ message: "Email not found" });
    } else if (error.message === "Incorrect password!") {
      res.status(401).json({ message: "Incorrect password!" });
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
};

module.exports = { registerUser, UserLogin };
