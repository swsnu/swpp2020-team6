/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from "react";
import ItemsCarousel from "react-items-carousel";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";
import { history } from "../../store/store";
import SimpleRoadmap from "../../components/SimpleRoadmap/SimpleRoadmap";
import "./RoadmapCarousel.scss";
import rotus from "../../misc/only_rotus.png";

const RoadmapCarousel = (props) => {
  const [activeBestRoadmap, setActiveBestRoadmap] = useState(0);
  const [activeNewRoadmap, setActiveNewRoadmap] = useState(0);
  const [activeRecommendedRoadmap, setActiveRecommendedRoadmap] = useState(0);
  const chevronWidth = 40;

  const {
    bestRoadmaps,
    newRoadmaps,
    recommendedRoadmaps,
    getBestRoadmaps,
    getNewRoadmaps,
    getRecommendedRoadmaps,
    newRoadmapsError,
    bestRoadmapsError,
    recommendedRoadmapsError,
  } = props;
  useEffect(() => {
    getBestRoadmaps(12);
    getNewRoadmaps(12);

    return () => {
      const { onResetBestRoadmaps, onResetNewRoadmaps, onResetRecommendedRoadmaps } = props;
      onResetBestRoadmaps();
      onResetNewRoadmaps();
      onResetRecommendedRoadmaps();
    };
  }, []);

  // || recommendedRoadmaps.length === 0
  if (bestRoadmaps.length === 0 || newRoadmaps.length === 0) {
    const bestRoadmapsLoadingState = bestRoadmapsError ? (
      <p id="get-best-roadmaps-error">
        {`${bestRoadmapsError} occurred while loading best roadmaps!`}
        <br />
        Try refreshing the page!
      </p>
    ) : (
      <p>Loading...Please wait!</p>
    );
    const newRoadmapsLoadingState = newRoadmapsError ? (
      <p id="get-new-roadmaps-error">
        {`${newRoadmapsError} occurred while loading new roadmaps!`}
        <br />
        Try refreshing the page!
      </p>
    ) : (
      <p>Loading...Please wait!</p>
    );
    /*
    const recommendedRoadmapsLoadingState = recommendedRoadmapsError ? (
      <p id="get-recommended-roadmaps-error">
        {`${recommendedRoadmapsError} occurred while loading recommended roadmaps!`}
        <br />
        Try refreshing the page!
      </p>
    ) : (
      <p>Loading...Please wait!</p>
    );
    */
    return (
      <div className="carousels">
        <div className="best-roadmaps-panel">
          <h2>Checkout top 12 Roadmaps!</h2>
          {bestRoadmapsLoadingState}
        </div>
        <div className="new-roadmaps-panel">
          <h2>Checkout some recently created Roadmaps!</h2>
          {newRoadmapsLoadingState}
        </div>
      </div>
    );
    /*
    <div className="recommended-roadmaps-panel">
          <h2>Checkout some recommended Roadmaps!</h2>
          {recommendedRoadmapsLoadingState}
        </div>
     */
  }

  const makeRoadmapItemList = (roadmapList) => {
    return roadmapList.map((roadmap) => (
      <SimpleRoadmap
        key={roadmap.id}
        onClick={() => history.push(`/roadmap/${roadmap.id}`)}
        roadmapDescription={roadmap.description}
        roadmapId={roadmap.id}
        roadmapTitle={roadmap.title}
        roadmapLevel={roadmap.level}
        authorName={roadmap.author_name}
        authorId={roadmap.author_id}
        date={roadmap.date}
        likeCount={roadmap.like_count}
        pinCount={roadmap.pin_count}
        commentCount={roadmap.comment_count}
        tagList={roadmap.tags}
        isMyPage={false}
        roadmapImageId={roadmap.image_id}
        isPrivate={roadmap.private}
      />
    ));
  };

  return (
    <div className="carousels">
      <h2>
        <img src={rotus} />
        Don't know where to start?
        <img src={rotus} />
      </h2>
      <div className="best-roadmaps-panel">
        <h3>
          <span role="img" aria-label="sparkle">
            ✨
          </span>
          Best Roadmaps!
          <span role="img" aria-label="sparkle">
            ✨
          </span>
        </h3>
        <div className="best-roadmaps" style={{ padding: `0 ${chevronWidth}px` }}>
          <ItemsCarousel
            requestToChangeActive={setActiveBestRoadmap}
            activeItemIndex={activeBestRoadmap}
            numberOfCards={4}
            gutter={20}
            leftChevron={
              <button className="left-button" type="button">
                <ChevronLeftIcon />
              </button>
            }
            rightChevron={
              <button className="right-button" type="button">
                <ChevronRightIcon />
              </button>
            }
            outsideChevron
            chevronWidth={chevronWidth}
            slidesToScroll={4}
          >
            {makeRoadmapItemList(bestRoadmaps)}
          </ItemsCarousel>
        </div>
      </div>
      <div className="recommended-roadmaps-panel">
        <h3>
          <span role="img" aria-label="sunglass">
            😎
          </span>
          Roadmaps Recommended for You!
          <span role="img" aria-label="sunglass">
            😎
          </span>
        </h3>
        <div className="recommended-roadmaps" style={{ padding: `0 ${chevronWidth}px` }}>
          <ItemsCarousel
            requestToChangeActive={setActiveRecommendedRoadmap}
            activeItemIndex={activeRecommendedRoadmap}
            numberOfCards={4}
            gutter={20}
            leftChevron={
              <button className="left-button" type="button">
                <ChevronLeftIcon />
              </button>
            }
            rightChevron={
              <button className="right-button" type="button">
                <ChevronRightIcon />
              </button>
            }
            outsideChevron
            chevronWidth={chevronWidth}
            slidesToScroll={4}
          >
            {makeRoadmapItemList(newRoadmaps)}
          </ItemsCarousel>
        </div>
      </div>
      <div className="new-roadmaps-panel">
        <h3>
          <span role="img" aria-label="baby">
            👶
          </span>
          New Roadmaps!
          <span role="img" aria-label="baby">
            👶
          </span>
        </h3>
        <div className="new-roadmaps" style={{ padding: `0 ${chevronWidth}px` }}>
          <ItemsCarousel
            requestToChangeActive={setActiveNewRoadmap}
            activeItemIndex={activeNewRoadmap}
            numberOfCards={4}
            gutter={20}
            leftChevron={
              <button className="left-button" type="button">
                <ChevronLeftIcon />
              </button>
            }
            rightChevron={
              <button className="right-button" type="button">
                <ChevronRightIcon />
              </button>
            }
            outsideChevron
            chevronWidth={chevronWidth}
            slidesToScroll={4}
          >
            {makeRoadmapItemList(newRoadmaps)}
          </ItemsCarousel>
        </div>
      </div>
    </div>
  );
};

RoadmapCarousel.propTypes = {
  bestRoadmaps: PropTypes.arrayOf(PropTypes.any).isRequired,
  newRoadmaps: PropTypes.arrayOf(PropTypes.any).isRequired,
  recommendedRoadmaps: PropTypes.arrayOf(PropTypes.any).isRequired,
  getBestRoadmaps: PropTypes.func.isRequired,
  getNewRoadmaps: PropTypes.func.isRequired,
  getRecommendedRoadmaps: PropTypes.func.isRequired,
  onResetBestRoadmaps: PropTypes.func.isRequired,
  onResetNewRoadmaps: PropTypes.func.isRequired,
  onResetRecommendedRoadmaps: PropTypes.func.isRequired,
  newRoadmapsError: PropTypes.number,
  bestRoadmapsError: PropTypes.number,
  recommendedRoadmapsError: PropTypes.number,
};

const mapStateToProps = (state) => {
  return {
    selectedUser: state.user.selectedUser,
    bestRoadmaps: state.roadmap.bestRoadmaps,
    newRoadmaps: state.roadmap.newRoadmaps,
    recommendedRoadmaps: state.roadmap.recommendedRoadmaps,
    bestRoadmapsError: state.roadmap.bestRoadmapsError,
    newRoadmapsError: state.roadmap.newRoadmapsError,
    recommendedRoadmapsError: state.roadmap.recommendedRoadmapsError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBestRoadmaps: (topN) => dispatch(actionCreators.getBestRoadmaps(topN)),
    getNewRoadmaps: (topN) => dispatch(actionCreators.getNewRoadmaps(topN)),
    getRecommendedRoadmaps: () => dispatch(actionCreators.getRecommendedRoadmaps()),
    onResetBestRoadmaps: () => dispatch(actionCreators.resetBestRoadmaps_()),
    onResetNewRoadmaps: () => dispatch(actionCreators.resetNewRoadmaps_()),
    onResetRecommendedRoadmaps: () => dispatch(actionCreators.resetRecommendedRoadmaps_()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RoadmapCarousel));
