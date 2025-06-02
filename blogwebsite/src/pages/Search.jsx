import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import searchNotfound from "../assets/images/searchnotfound.png";

const Search = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("title");

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Fetch search results based on the searchTerm
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/searchBlogPosts?title=${encodeURIComponent(
            searchTerm
          )}`
        );
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    if (searchTerm) {
      fetchSearchResults();
    }
  }, [searchTerm]);

  return (
    <div className="min-vh-100 container">
      <div className="row mt-4">
        <h5>
          Search Results for{" "}
          <span style={{ fontWeight: "700" }}>"{searchTerm}"</span>
        </h5>

        {searchResults.length === 0 ? (
          <div>
            <img
              style={{ width: "100%", height: "70vh", objectFit: "contain" }}
              src={searchNotfound}
              alt="search not found"
            />
            <h4 className="text-center">Ups!... no results found</h4>
            <p className="text-center">Please try another search</p>
          </div>
        ) : (
          // Render your search results here using the searchResults state
          searchResults.map((post) => (
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
          ))
        )}
      </div>
    </div>
  );
};

export default Search;
