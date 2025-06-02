import React, { useState } from "react";
import { format } from "date-fns";

const BlogCard = ({ postDate, title, description, imageUrl, postId }) => {
  const formatDate = (inputDate) => {
    const formattedDate = format(new Date(inputDate), "MMM. do, yyyy");
    return formattedDate;
  };

  const truncatedDescription = description.split(" ").slice(0, 15).join(" ");

  const [selectedPost, setSelectedPost] = useState(null);

  const handleReadMore = () => {
    setSelectedPost({
      title,
      description,
      postDate,
      imageUrl,
    });
  };

  return (
    <div className="col-md-4 mt-3">
      <div className="mt-4">
        <img src={imageUrl} alt={title} className="BlogImage" />
        <div>
          <p className="mt-3 PostDate">{formatDate(postDate)}</p>
          <h5
            className="BlogTitle text-capitalize"
            style={{ height: "25px", overflow: "hidden" }}
          >
            {title}
          </h5>
          <p
            className="BlogDescription"
            style={{ height: "45px", overflow: "hidden" }}
          >
            {" "}
            {`${truncatedDescription} . . .`}
          </p>
          <button
            className="ReadMoreButton"
            data-bs-toggle="modal"
            data-bs-target={`#readDetail-${postId}`}
            onClick={handleReadMore}
          >
            Read More
          </button>
        </div>
      </div>

      <div
        className="modal fade"
        id={`readDetail-${postId}`}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby={`readDetailLabel-${postId}`}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-dialog-scrollable">
          <div className="modal-content p-3">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id={`readDetailLabel-${postId}`}>
                {selectedPost && selectedPost.title}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {selectedPost && (
                <>
                  <p>{formatDate(selectedPost.postDate)}</p>
                  <img
                    src={selectedPost.imageUrl}
                    alt={selectedPost.title}
                    className="BlogImage"
                  />
                  <p className="pt-4">{selectedPost.description}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
