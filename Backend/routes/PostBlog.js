const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const { pool } = require("../db");

// File upload configuration
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
  },
});

const upload = multer({ storage });

// Create blog post route (POST)
router.post("/postBlog", upload.single("image"), async (req, res) => {
  try {
    const { title, description, category, userId } = req.body;
    const imageUrl = req.file ? req.file.filename : null;

    const query = `INSERT INTO PostBlog (title, description, image_url, category, user_id) 
                     VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [title, description, imageUrl, category, userId];

    const result = await pool.query(query, values);
    const createdPost = result.rows[0];

    res.status(201).json(createdPost);
  } catch (error) {
    console.error("Error creating blog post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Fetch all blog posts route (GET)
router.get("/getAllBlogPosts", async (req, res) => {
  try {
    const query = "SELECT * FROM PostBlog ORDER BY created_at DESC"; // Add ORDER BY clause
    const result = await pool.query(query);
    const allPosts = result.rows;

    res.status(200).json(allPosts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/getUserBlogPosts/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const result = await pool.query(
      "SELECT * FROM PostBlog WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// For Category Travel
router.get("/getAllBlogTravel", async (req, res) => {
  try {
    const query =
      "SELECT * FROM PostBlog WHERE category = 'Travel' ORDER BY created_at DESC";
    const result = await pool.query(query);
    const travelPosts = result.rows;

    res.status(200).json(travelPosts);
  } catch (error) {
    console.error("Error fetching travel blog posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// For Category Food & Cooking
router.get("/getAllBlogFoodCooking", async (req, res) => {
  try {
    const query =
      "SELECT * FROM PostBlog WHERE category = 'Food & Cooking' ORDER BY created_at DESC";
    const result = await pool.query(query);
    const FoodPosts = result.rows;

    res.status(200).json(FoodPosts);
  } catch (error) {
    console.error("Error fetching travel blog posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Fashion & Style
router.get("/getAllBlogFashion", async (req, res) => {
  try {
    const query =
      "SELECT * FROM PostBlog WHERE category = 'Fashion & Style' ORDER BY created_at DESC";
    const result = await pool.query(query);
    const FashionPosts = result.rows;

    res.status(200).json(FashionPosts);
  } catch (error) {
    console.error("Error fetching travel blog posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Health & Fitness
router.get("/getAllBlogFitness", async (req, res) => {
  try {
    const query =
      "SELECT * FROM PostBlog WHERE category = 'Health & Fitness' ORDER BY created_at DESC";
    const result = await pool.query(query);
    const FitnessPosts = result.rows;

    res.status(200).json(FitnessPosts);
  } catch (error) {
    console.error("Error fetching travel blog posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Fetch all blog posts route (GET) with search parameters
router.get("/searchBlogPosts", async (req, res) => {
  try {
    let query = "SELECT * FROM PostBlog";
    const queryParams = [];

    // Check if title parameter is provided
    if (req.query.title) {
      queryParams.push(`title ILIKE '%${req.query.title}%'`);
    }

    // Check if category parameter is provided
    if (req.query.category) {
      queryParams.push(`category ILIKE '%${req.query.category}%'`);
    }

    // Add WHERE clause if any search parameter is provided
    if (queryParams.length > 0) {
      query += " WHERE " + queryParams.join(" AND ");
    }

    query += " ORDER BY created_at DESC";

    const result = await pool.query(query);
    const allPosts = result.rows;

    res.status(200).json(allPosts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
