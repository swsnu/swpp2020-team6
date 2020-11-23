import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import * as actionCreators from "../../store/actions/index";
import RecipeReviewCard from "../../components/SimpleRoadmap/SimpleRoadmap";
import "./Home.scss";

class Home extends Component {
  onClickSignIn = () => {
    const { history } = this.props;
    history.push("/signin");
  };

  onClickSignUp = () => {
    const { history } = this.props;
    history.push("/signup");
  };

  onClickSignOut = () => {
    const { onSignOut } = this.props;
    onSignOut();
  };

  render() {
    return (
      <div>
        <div className="Home">
          <h1>Home</h1>
          <button id="signin-button" onClick={() => this.onClickSignIn()} type="button">
            Sign In
          </button>
          <button id="signup-button" onClick={() => this.onClickSignUp()} type="button">
            Sign Up
          </button>
          <button id="signout-button" onClick={() => this.onClickSignOut()} type="button">
            Sign Out
          </button>
        </div>
        <RecipeReviewCard
          authorId={1}
          roadmapId={2}
          roadmapTitle="hi"
          roadmapLevel={1}
          authorName="gina"
          date="2020-11-23"
          likeCount={2}
          pinCount={1}
          commentCount={2}
          authorPictureUrl="./"
          tagList={[{ tag_name: "abcd" }, { tag_name: "efg" }, { tag_name: "hijklm" }]}
          isMyPage={false}
          roadmapImageId="1"
        />
      </div>
    );
  }
}
Home.propTypes = {
  onSignOut: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any),
};

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.user.isSignedIn,
    // TODO: bring roadmaps to show in my_roadmap tab
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignOut: () => dispatch(actionCreators.signOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
