import React, { useState, useEffect } from "react";
import HeroBanner from "../components/HeroBanner";
import BlogCard from "../components/BlogCard";
import "../assets/css/Home.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, Link } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const successMessage = location.state && location.state.successMessage;
  const [posts, setPosts] = useState([]);
  const [food, setFood] = useState([]);
  const [fashion, setFashion] = useState([]);
  const [fitness, setFitness] = useState([]);

  useEffect(() => {
    if (successMessage) {
      // Clear any existing toasts
      toast.dismiss();
      // Show a success toast with the provided message
      toast.success(successMessage);
    }
  }, [successMessage]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/getAllBlogTravel");
        const data = await response.json();
        const top6Posts = data.slice(0, 6);
        setPosts(top6Posts);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    fetchBlogPosts();
  }, []);

  useEffect(() => {
    const fetchBlogPostsFood = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/getAllBlogFoodCooking"
        );
        const data = await response.json();
        const top6Posts = data.slice(0, 6);
        setFood(top6Posts);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    fetchBlogPostsFood();
  }, []);

  useEffect(() => {
    const fetchBlogPostsFashion = async () => {
      try {
        const response = await fetch("http://localhost:5000/getAllBlogFashion");
        const data = await response.json();
        const top6Posts = data.slice(0, 6);
        setFashion(top6Posts);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    fetchBlogPostsFashion();
  }, []);

  useEffect(() => {
    const fetchBlogPostsFitness = async () => {
      try {
        const response = await fetch("http://localhost:5000/getAllBlogFitness");
        const data = await response.json();
        const top6Posts = data.slice(0, 6);
        setFitness(top6Posts);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    fetchBlogPostsFitness();
  }, []);
  return (
    <div className="m-0 p-0 ">
      <div>
        <HeroBanner />
      </div>

      {/* Blog Travel Section */}
      <div className="container blogSection mt-5">
        <div className="d-flex">
          <h3 className="home-heading text-uppercase me-auto">Traveling</h3>
          <Link style={{ textDecoration: "underline", color: "#000" }} to="">
            View All
          </Link>
        </div>
        <div className="row">
          {posts.map((post) => (
            <BlogCard
              key={post.id}
              postId={post.post_id}
              title={post.title}
              description={post.description}
              postDate={post.created_at}
              imageUrl={`http://localhost:5000/uploads/${encodeURIComponent(
                post.image_url
              )}`}
            />
          ))}
        </div>
      </div>

      {/* Blog Food & cooking Section */}
      <div className="container blogSection mt-5">
        <div className="d-flex">
          <h3 className="home-heading text-uppercase me-auto">
            Fooding & Cooking
          </h3>
          <Link style={{ textDecoration: "underline", color: "#000" }} to="">
            View All
          </Link>
        </div>
        <div className="row">
          {food.map((post) => (
            <BlogCard
              key={post.id}
              postId={post.post_id}
              title={post.title}
              description={post.description}
              postDate={post.created_at}
              imageUrl={`http://localhost:5000/uploads/${encodeURIComponent(
                post.image_url
              )}`}
            />
          ))}
        </div>
      </div>

      {/* Blog Fashion & Style Section */}
      <div className="container blogSection mt-5">
        <div className="d-flex">
          <h3 className="home-heading text-uppercase me-auto">
            Fashion & Style
          </h3>
          <Link style={{ textDecoration: "underline", color: "#000" }} to="">
            View All
          </Link>
        </div>
        <div className="row">
          {fashion.map((post) => (
            <BlogCard
              key={post.id}
              postId={post.post_id}
              title={post.title}
              description={post.description}
              postDate={post.created_at}
              imageUrl={`http://localhost:5000/uploads/${encodeURIComponent(
                post.image_url
              )}`}
            />
          ))}
        </div>
      </div>

      {/* Blog Health & Fitness Section */}
      <div className="container blogSection mt-5">
        <div className="d-flex">
          <h3 className="home-heading text-uppercase me-auto">
            Health & Fitness
          </h3>
          <Link style={{ textDecoration: "underline", color: "#000" }} to="">
            View All
          </Link>
        </div>
        <div className="row">
          {fitness.map((post) => (
            <BlogCard
              key={post.id}
              postId={post.post_id}
              title={post.title}
              description={post.description}
              postDate={post.created_at}
              imageUrl={`http://localhost:5000/uploads/${encodeURIComponent(
                post.image_url
              )}`}
            />
          ))}
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Home;
