import React from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ImageSlider from "./ImageSlider";
import rotus from "../../misc/rotus.png";
import blue from "../../misc/blue-bg.png";

const DemoCarousel = () => {
  return (
    <div className="DemoCarousel">
      <h1>Hi! DemoCarousel!</h1>
      <Carousel>
        <Carousel.Item>
          <img src={blue} alt="This is the first slide" />
          <Carousel.Caption>
            <h3>Welcome to Rotus!</h3>
            <p>Explore awesome well organized, awsome roadamps and plan for your goals!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={blue} alt="This is the first slide" />
          <Carousel.Caption>
            <h3>How to get started</h3>
            <p>A quick walk through with key features and tips to create a great roadmap!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={rotus} alt="This is the first slide" />
          <Carousel.Caption>
            <h3>[AD] The world-wide best biscuits</h3>
            <p>enjoy rotus anywhere!</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <ImageSlider />
    </div>
  );
};

export default DemoCarousel;

// Don't forget to include the css in your page

// Using webpack or parcel with a style loader
// import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
