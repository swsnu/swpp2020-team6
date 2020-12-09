import React from "react";
import { Carousel } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import exercise from "../../misc/banner/exercise.png";
import coding from "../../misc/banner/coding.png";
import level from "../../misc/banner/level.png";
import RoadmapCarousel from "./RoadmapCarousel";

const MainPage = (props) => {
  const { isSignedIn, history } = props;
  if (isSignedIn === false) {
    history.push("/signin");
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
            <img src={exercise} alt="Images from Flaticon" width="1838px" height="284px" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={coding} alt="This is the first slide" width="1838px" height="284px" />
            <Carousel.Caption>
              <p>
                Icons made by
                {
                  " " // blank
                }
                <a href="https://www.flaticon.com/authors/prettycons" title="prettycons">
                  prettycons
                </a>
                {
                  " " // blank
                }
                from
                {
                  " " // blank
                }
                <a href="https://www.flaticon.com/" title="Flaticon">
                  {
                    " " // blank
                  }
                  www.flaticon.com
                </a>
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src={level} alt="Diverse level in Rotus" width="1838px" height="284px" />
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
