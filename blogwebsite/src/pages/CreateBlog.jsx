import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/css/BlogPost.css";
import { format } from "date-fns";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";

const CreateBlog = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const successMsg = location.state && location.state.successMessage;

  const [blogData, setBlogData] = useState({
    title: "",
    category: "",
    description: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [allPosts, setAllPosts] = useState([]);

  // Assuming userId is stored in localStorage
  const userId = parseInt(localStorage.getItem("userId"));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogData({ ...blogData, [name]: value });
  };

  const handleImageChange = (e) => {
    setBlogData({ ...blogData, image: e.target.files[0] });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("category", blogData.category);
    formData.append("description", blogData.description);
    formData.append("image", blogData.image);
    formData.append("userId", userId);

    try {
      const response = await fetch("http://localhost:5000/postBlog", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success({ successMsg });
        setSuccessMessage("");
        // Reset the form
        setBlogData({
          title: "",
          category: "",
          description: "",
          image: null,
        });
        navigate("/", {
          state: {
            successMessage: "Blog post created successfully!",
          },
        });
        window.location.reload();
      } else {
        const errorMessage = await response.text();
        toast.error("Error creating blog post: " + errorMessage);
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again later.");
      toast.error("Error creating blog post: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (inputDate) => {
    const formattedDate = format(new Date(inputDate), "MMM. do, yyyy");
    return formattedDate;
  };

  // Fetch all blog posts when the component mounts
  useEffect(() => {
    const fetchUserBlogPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/getUserBlogPosts/${userId}`
        );
        setAllPosts(response.data);
      } catch (error) {
        console.error(
          "Error fetching user-specific blog posts:",
          error.message
        );
      }
    };

    fetchUserBlogPosts();
  }, [userId]);
  return (
    <div className="container mt-5">
      <div className="row min-vh-100">
        <div className="col-md-6 blog-post">
          <h5
            style={{
              textTransform: "uppercase",
              fontWeight: "700",
              borderBottom: "2px solid #000",
              paddingBottom: "15px",
              paddingRight: "40px",
            }}
          >
            Post New Blog
          </h5>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3 mt-4">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Blog Title :
              </label>
              <input
                required
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                name="title"
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Blog Category :
              </label>
              <select
                required
                className="form-select"
                aria-label="Default select example"
                name="category"
                onChange={handleInputChange}
              >
                <option disabled selected>
                  Select Blog Category
                </option>
                <option value="Travel">Travel</option>
                <option value="Food & Cooking">Food & Cooking</option>
                <option value="Fashion & Style">Fashion & Style</option>
                <option value="Health & Fitness">Health & Fitness</option>
                <option value="Health & Fitness">Health & Fitness</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Blog Description :
              </label>
              <textarea
                required
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                name="description"
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="formFile" className="form-label">
                Select Image :
              </label>
              <input
                required
                className="form-control"
                type="file"
                id="formFile"
                name="image"
                onChange={handleImageChange}
              />
            </div>
            <button
              type="submit"
              className="btn w-100 btn-postblog py-2 mt-3"
              disabled={loading}
            >
              {loading ? "Posting..." : "POST BLOG"}
            </button>
            {error && <p className="text-danger mt-2">{error}</p>}
            {successMessage && (
              <p className="text-success mt-2">{successMessage}</p>
            )}
          </form>
        </div>
        <div className="col-md-6">
          <div className="row ps-5">
            {allPosts.map((post) => (
              <div key={post.post_id} className="mb-3 col-md-6">
                <div className="MyPost">
                  <img
                    className="myPostImg"
                    src={`http://localhost:5000/uploads/${encodeURIComponent(
                      post.image_url
                    )}`}
                    alt={post.title}
                    style={{ maxWidth: "100%" }}
                  />
                  <p className="ps-2 pt-2">
                    Created At: {formatDate(post.created_at)}
                  </p>
                  <h6 className="ps-2">{post.title}</h6>
                  <p
                    className="px-2 w-100"
                    style={{
                      overflow: "hidden",
                      fontSize: "14px",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {post.description}
                  </p>
                  <div className="d-flex ps-2 gap-3 mb-2">
                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#editPost"
                      className="editButton"
                    >
                      <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button
                      className="deleteButton"
                      data-bs-toggle="modal"
                      data-bs-target="#deltePost"
                    >
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </div>

                  {/* Edit Post */}
                  <div
                    className="modal fade"
                    id="editPost"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabindex="-1"
                    aria-labelledby="editPostLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content px-3 py-2">
                        <div className="modal-header">
                          <h1 className="modal-title fs-5" id="editPostLabel">
                            Edit Blog Post
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          {" "}
                          <form onSubmit={handleFormSubmit}>
                            <div className="mb-3 mt-3">
                              <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label"
                              >
                                Blog Title :
                              </label>
                              <input
                                required
                                type="text"
                                className="form-control"
                                id="exampleFormControlInput1"
                                name="title"
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="mb-4">
                              <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label"
                              >
                                Blog Category :
                              </label>
                              <select
                                required
                                className="form-select"
                                aria-label="Default select example"
                                name="category"
                                onChange={handleInputChange}
                              >
                                <option disabled selected>
                                  Select Blog Category
                                </option>
                                <option value="Travel">Travel</option>
                                <option value="Food & Cooking">
                                  Food & Cooking
                                </option>
                                <option value="Fashion & Style">
                                  Fashion & Style
                                </option>
                                <option value="Health & Fitness">
                                  Health & Fitness
                                </option>
                                <option value="Health & Fitness">
                                  Health & Fitness
                                </option>
                                <option value="Others">Others</option>
                              </select>
                            </div>

                            <div className="mb-4">
                              <label
                                htmlFor="exampleFormControlTextarea1"
                                className="form-label"
                              >
                                Blog Description :
                              </label>
                              <textarea
                                required
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="3"
                                name="description"
                                onChange={handleInputChange}
                              ></textarea>
                            </div>
                            <div className="mb-4">
                              <label htmlFor="formFile" className="form-label">
                                Select Image :
                              </label>
                              <input
                                required
                                className="form-control"
                                type="file"
                                id="formFile"
                                name="image"
                                onChange={handleImageChange}
                              />
                            </div>
                            <button
                              type="submit"
                              className="btn w-100 btn-sucess btn-postblog py-2 mt-3"
                              disabled={loading}
                            >
                              {loading ? "Updating..." : "Update"}
                            </button>
                            {error && (
                              <p className="text-danger mt-2">{error}</p>
                            )}
                            {successMessage && (
                              <p className="text-success mt-2">
                                {successMessage}
                              </p>
                            )}
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Delete Blog Post */}
                  <div
                    className="modal fade"
                    id="deltePost"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabindex="-1"
                    aria-labelledby="deltePostLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="staticBackdropLabel"
                          >
                            Delete Blog Post
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          Are you sure you want to delete this post?
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary px-5"
                            data-bs-dismiss="modal"
                          >
                            No
                          </button>
                          <button type="button" className="btn btn-danger px-5">
                            Yes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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

export default CreateBlog;
