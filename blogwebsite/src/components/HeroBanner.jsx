import React from "react";
import "../assets/css/Home.css";
import slider01 from "../assets/images/health.png";
import slider02 from "../assets/images/food.png";
import slider03 from "../assets/images/travel.png";

const HeroBanner = () => {
  return (
    <div
      id="carouselExampleCaptions"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          className="active slider-button"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          className="slider-button"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          className="slider-button"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active" data-bs-interval="10000">
          <img src={slider01} className="d-block heroImage  w-100" alt="..." />
          <div className="carousel-caption d-block">
            <h5 className="slider-heading">Fitness & Health</h5>
            <p>
              Discover a healthier you with our Fitness & Health journey! <br />
              Your path to wellness begins here.
            </p>
          </div>
        </div>
        <div className="carousel-item" data-bs-interval="10000">
          <img src={slider02} className="d-block w-100" alt="..." />
          <div className="carousel-caption d-block">
            <h5 className="slider-heading">Food & Cooking</h5>
            <p>
              Cooking up Conversations, Serving Stories: Elevate Your Culinary
              Experience! <br /> Join Our Journey into the Heart of Fooding and
              Cooking. Where Every Post is a Recipe for Delight!
            </p>
          </div>
        </div>
        <div className="carousel-item" data-bs-interval="10000">
          <img src={slider03} className="d-block w-100" alt="..." />
          <div className="carousel-caption  d-block">
            <h5 className="slider-heading">Traveling</h5>
            <p>
              Explore the world, one adventure at a time with Wanderlust
              Chronicles. <br /> Embark on a journey into the heart of travel.
              Let the exploration begin!
            </p>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default HeroBanner;
