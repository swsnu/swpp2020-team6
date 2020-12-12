import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import MyTab from "../../components/MyPage/StyledComponents/MyTab";
import SimpleRoadmap from "../../components/SimpleRoadmap/SimpleRoadmap";
import UserCard from "../../components/RoadmapDetail/UserCard";
import SimpleWordcloud from "./SimpleWordcloud";
import * as actionCreators from "../../store/actions/index";
import "./MyPage.scss";

class MyPage extends Component {
  state = {
    tab: 0,
  };

  componentDidMount() {
    const { match, onGetMyPageUser } = this.props;
    onGetMyPageUser(match.params.id);
  }

  componentWillUnmount() {
    const { onResetMyPageUser } = this.props;
    onResetMyPageUser();
  }

  onChangeTab = (tab) => {
    this.setState({ tab });
  };

  makeRoadmapItemList = (roadmapList) => {
    const { history } = this.props;

    return roadmapList.map((roadmap) => (
      <SimpleRoadmap
        key={roadmap.id}
        onClick={() => history.push(`/roadmap/${roadmap.id}`)}
        roadmapDescription={roadmap.description}
        roadmapTitle={roadmap.title}
        roadmapLevel={roadmap.level}
        authorId={roadmap.author_id}
        authorName={roadmap.author_name}
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

  render() {
    const { selectedUser, myPageUser, history } = this.props;
    if (selectedUser === undefined) {
      window.alert("Please sign in!");
      history.push("/");
      return <div />;
    }
    if (myPageUser === undefined) {
      return (
        <div className="MyPage">
          <div className="loading" />
        </div>
      );
    }

    const { tab } = this.state;
    let user;
    let pinnedRoadmaps;
    let disabled = null;

    if (selectedUser.user_id === myPageUser.user_id) {
      user = selectedUser;
      pinnedRoadmaps = this.makeRoadmapItemList(user.pinned_roadmaps);
    } else {
      user = myPageUser;
      pinnedRoadmaps = [];
      disabled = 1;
    }

    const myRoadmaps = this.makeRoadmapItemList(user.my_roadmaps);

    return (
      <div className="MyPage">
        <div className="user-info">
          <UserCard authorId={user.user_id} authorName={user.username} history={history} />
          <SimpleWordcloud myPageUser={myPageUser} />
        </div>
        <div className="mypage-tab">
          <MyTab
            id="mypage-tab"
            tab={tab}
            onClick={this.onChangeTab}
            disabled={disabled}
            itemlists={[myRoadmaps, pinnedRoadmaps]}
            labels={["My Roadmaps", "Pinned Roadmaps"]}
          />
        </div>
      </div>
    );
  }
}

MyPage.propTypes = {
  selectedUser: PropTypes.objectOf(PropTypes.any),
  myPageUser: PropTypes.objectOf(PropTypes.any),
  match: PropTypes.objectOf(PropTypes.any),
  history: PropTypes.objectOf(PropTypes.any),
  onGetMyPageUser: PropTypes.func.isRequired,
  onResetMyPageUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    selectedUser: state.user.selectedUser,
    myPageUser: state.user.myPageUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetMyPageUser: (userId) => dispatch(actionCreators.getMyPageUser(userId)),
    onResetMyPageUser: () => dispatch(actionCreators.resetMyPageUser_()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MyPage));
