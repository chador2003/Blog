import React, { useState, useEffect } from "react";
import "../assets/css/Footer.css";
import { format } from "date-fns";

const Footer = () => {
  const [posts, setPosts] = useState([]);

  const formatDate = (inputDate) => {
    const formattedDate = format(new Date(inputDate), "MMM. do, yyyy");
    return formattedDate;
  };
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/getAllBlogPosts");
        const data = await response.json();

        //top 3 posts
        const top3Posts = data.slice(0, 3);

        setPosts(top3Posts);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    fetchBlogPosts();
  }, []);

  return (
    <div className="footer-section mt-5">
      <div className="container pt-5">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h6 className="text-uppercase">About</h6>
            <p className="pe-4  pt-3 about-us">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
              quae quas accusamus! Dignissimos neque et tenetur atque
              perferendis alias. Voluptatem laborum qui tempora quae
              consectetur.
            </p>
            <h6 className="mt-5 text-uppercase">Social</h6>
            <div className="social mt-3">
              <a href="/">
                <i class="fa-brands fa-square-instagram"></i>{" "}
              </a>
              <a href="/">
                <i class="fa-brands fa-facebook-f"></i>
              </a>
              <a href="/">
                <i class="fa-brands fa-linkedin-in"></i>
              </a>
              <a href="/">
                <i class="fa-brands fa-twitter"></i>
              </a>
              <a href="/">
                <i class="fa-brands fa-telegram"></i>
              </a>
            </div>
          </div>
          <div className="col-md-2 mb-3">
            <h6 className="text-uppercase">Quick Links</h6>
            <ul className="ps-0 mt-3">
              <li className="footer-item">
                <a href="https://www.blogger.com/blog/posts/8535246400316597450">
                  Blogger
                </a>
              </li>
              <li className="footer-item">
                <a href="https://www.blogger.com/blog/posts/8535246400316597450">
                  Medium
                </a>
              </li>
              <li className="footer-item">
                <a href="https://www.wix.com/">Wix</a>
              </li>
              <li className="footer-item">
                <a href="https://www.squarespace.com/">Squarespace</a>
              </li>
              <li className="footer-item">
                <a href="https://ghost.org/">Ghost</a>
              </li>
            </ul>
          </div>
          <div className="col-md-6 mb-3">
            <h6 className="text-uppercase">Recent Post Entry</h6>
            <div className="recentPostentry">
              {posts.map((post) => (
                <a key={post.id} href="/" className="recentpost mt-4">
                  <img
                    src={`http://localhost:5000/uploads/${encodeURIComponent(
                      post.image_url
                    )}`}
                    alt={post.title}
                    class="me-4 rounded recentImg"
                  />
                  <div class="text">
                    <h5>{post.title}</h5>
                    <div class="post-meta">
                      <span class="mr-2">{formatDate(post.created_at)} </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <hr className="mx-5 mt-5" />
      <p className="text-center mt-4" style={{ fontSize: "14px" }}>
        Copyright ©2023. All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
