import React from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import ImageSlider from "./ImageSlider";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import rotus from "../../misc/rotus.png";
import BestCarousel from "./BestCarousel";

const MainPage = () => {
  return (
    <>
      <CssBaseline />
      <Carousel>
        <Carousel.Item>
          <img src={rotus} alt="This is the first slide" width="1000px" height="300px" />
          <Carousel.Caption>
            <h3>Welcome to Rotus!</h3>
            <p>Explore awesome well organized, awsome roadamps and plan for your goals!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={rotus} alt="This is the first slide" width="1000px" height="300px" />
          <Carousel.Caption>
            <h3>How to get started</h3>
            <p>A quick walk through with key features and tips to create a great roadmap!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={rotus} alt="This is the first slide" width="1000px" height="300px" />
          <Carousel.Caption>
            <h3>[AD] The world-wide best biscuits</h3>
            <p>enjoy rotus anywhere!</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Container maxWidth="md">
        <div className="DemoCarousel">
          <h1>Hi! DemoCarousel!</h1>
          <BestCarousel />
        </div>
      </Container>
    </>
  );
};

export default MainPage;
// Don't forget to include the css in your page

// Using webpack or parcel with a style loader
// import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
