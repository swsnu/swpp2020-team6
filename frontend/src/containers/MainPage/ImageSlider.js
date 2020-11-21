/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import rotus from "../../misc/rotus.png";
import blue from "../../misc/blue-bg.png";
import "./DemoCarousel.scss";

const ImageSlider = () => {
  const settings = {
    dot: true,
    infinite: true,
    speed: 500,
    slideToShow: 3,
    slidesToScroll: 1,
    cssEase: "linear",
  };
  return (
    <Slider {...settings}>
      <div className="card-wrapper">
        <div className="card">
          <div className="card-image">
            <img src={blue} alt="This is the first slide" />
          </div>
          <ul className="social-icons">
            <li>
              <a href="https://www.facebook.com/">
                <i className="fa fa-facebook" />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/">
                <i className="fa fa-instagram" />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/?lang=en">
                <i className="fa fa-twitter" />
              </a>
            </li>
          </ul>
          <div className="details">
            <h2>Gina Sohn</h2>
          </div>
        </div>
      </div>
      <div className="card-wrapper">
        <div className="card">
          <div className="card-image">
            <img src={rotus} alt="This is the first slide" />
          </div>
          <ul className="social-icons">
            <li>
              <a href="https://www.facebook.com/">
                <i className="fa fa-facebook" />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/">
                <i className="fa fa-instagram" />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/?lang=en">
                <i className="fa fa-twitter" />
              </a>
            </li>
          </ul>
          <div className="details">
            <h2>YG Moon</h2>
          </div>
        </div>
      </div>
      <div className="card-wrapper">
        <div className="card">
          <div className="card-image">
            <img src={blue} alt="This is the first slide" />
          </div>
          <ul className="social-icons">
            <li>
              <a href="https://www.facebook.com/">
                <i className="fa fa-facebook" />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/">
                <i className="fa fa-instagram" />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/?lang=en">
                <i className="fa fa-twitter" />
              </a>
            </li>
          </ul>
          <div className="details">
            <h2>Haily Jo</h2>
          </div>
        </div>
      </div>
      <div className="card-wrapper">
        <div className="card">
          <div className="card-image">
            <img src={rotus} alt="This is the first slide" />
          </div>
          <ul className="social-icons">
            <li>
              <a href="https://www.facebook.com/">
                <i className="fa fa-facebook" />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/">
                <i className="fa fa-instagram" />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/?lang=en">
                <i className="fa fa-twitter" />
              </a>
            </li>
          </ul>
          <div className="details">
            <h2>KH Kim</h2>
          </div>
        </div>
      </div>
    </Slider>
  );
};

export default ImageSlider;
