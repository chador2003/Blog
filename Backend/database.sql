-- \c blogwebsite to get inside the database
-- To see all the tables \dt

-- To CREATE database 
CREATE DATABASE "blogwebsite";

-- To create user table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(250) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);

-- Create table postBlog
CREATE TABLE PostBlog (
    post_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(1000),
    category VARCHAR(255),
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- New column for creation timestamp
    FOREIGN KEY (user_id) REFERENCES users(id)
);
