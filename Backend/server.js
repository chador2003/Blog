const express = require("express");
const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");
const postBlogRoutes = require("./routes/PostBlog"); // Assuming you save the route in a file named posts.js

const { registerUser, UserLogin } = require("./routes/Auth");

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Registration route
app.post("/register", registerUser);
app.post("/login", UserLogin);
app.use(postBlogRoutes);

// Initialize Passport and session
app.use(
  session({ secret: "your-secret-key", resave: true, saveUninitialized: true })
);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
