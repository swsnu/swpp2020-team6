/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from "react";
import ItemsCarousel from "react-items-carousel";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";
import { history } from "../../store/store";
import SimpleRoadmap from "../../components/SimpleRoadmap/SimpleRoadmap";
import "./RoadmapCarousel.scss";

const RoadmapCarousel = (props) => {
  const [activeBestRoadmap, setActiveBestRoadmap] = useState(0);
  const [activeNewRoadmap, setActiveNewRoadmap] = useState(0);
  const chevronWidth = 40;

  const { bestRoadmaps, newRoadmaps, getBestRoadmaps, getNewRoadmaps } = props;
  useEffect(() => {
    getBestRoadmaps(12);
    getNewRoadmaps(12);

    return () => {
      const { onResetBestRoadmaps, onResetNewRoadmaps } = props;
      onResetBestRoadmaps();
      onResetNewRoadmaps();
    };
  }, []);

  if (bestRoadmaps.length === 0 || newRoadmaps.length === 0) {
    return (
      <div className="carousels">
        <hi>Loading...</hi>
      </div>
    );
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
        date={roadmap.date}
        likeCount={roadmap.like_count}
        pinCount={roadmap.pin_count}
        commentCount={roadmap.comment_count}
        tagList={roadmap.tags}
        isMyPage={false}
        roadmapImageId={roadmap.image_id}
      />
    ));
  };

  return (
    <div className="carousels">
      <div className="best-roadmaps-panel">
        <h2>Checkout top 12 Roadmaps!</h2>
        <div className="best-roadmaps" style={{ padding: `0 ${chevronWidth}px` }}>
          <ItemsCarousel
            requestToChangeActive={setActiveBestRoadmap}
            activeItemIndex={activeBestRoadmap}
            numberOfCards={4}
            gutter={20}
            leftChevron={<button type="button">{"<"}</button>}
            rightChevron={<button type="button">{">"}</button>}
            outsideChevron
            chevronWidth={chevronWidth}
          >
            {makeRoadmapItemList(bestRoadmaps)}
          </ItemsCarousel>
        </div>
      </div>
      <div className="new-roadmaps-panel">
        <h2>Checkout some recently created Roadmaps!</h2>
        <div className="new-roadmaps" style={{ padding: `0 ${chevronWidth}px` }}>
          <ItemsCarousel
            requestToChangeActive={setActiveNewRoadmap}
            activeItemIndex={activeNewRoadmap}
            numberOfCards={4}
            gutter={20}
            leftChevron={<button type="button">{"<"}</button>}
            rightChevron={<button type="button">{">"}</button>}
            outsideChevron
            chevronWidth={chevronWidth}
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
  getBestRoadmaps: PropTypes.func.isRequired,
  getNewRoadmaps: PropTypes.func.isRequired,
  onResetBestRoadmaps: PropTypes.func.isRequired,
  onResetNewRoadmaps: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    selectedUser: state.user.selectedUser,
    bestRoadmaps: state.roadmap.bestRoadmaps,
    newRoadmaps: state.roadmap.newRoadmaps,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBestRoadmaps: (topN) => dispatch(actionCreators.getBestRoadmaps(topN)),
    getNewRoadmaps: (topN) => dispatch(actionCreators.getNewRoadmaps(topN)),
    onResetBestRoadmaps: () => dispatch(actionCreators.resetBestRoadmaps_()),
    onResetNewRoadmaps: () => dispatch(actionCreators.resetNewRoadmaps_()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RoadmapCarousel));
