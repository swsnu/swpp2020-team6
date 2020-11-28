import React from "react";
import { Carousel } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import rotus from "../../misc/rotus.png";
import RoadmapCarousel from "./RoadmapCarousel";

const MainPage = (props) => {
  const { isSignedIn, history } = props;
  if (isSignedIn === false) {
    history.push("/home");
    return (
      <div className="MainPage">
        <h1>Redirecting...</h1>
      </div>
    );
  }
  return (
    <div className="MainPage">
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
        <div className="RoadmapCarousel">
          <RoadmapCarousel />
        </div>
      </>
    </div>
  );
};

MainPage.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.user.isSignedIn,
  };
};

export default connect(mapStateToProps, null)(MainPage);
// Don't forget to include the css in your page

// Using webpack or parcel with a style loader
// import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
