import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import * as actionCreators from "../../store/actions/index";
import userImg from "../../misc/rotus-img.png";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

class MyPage extends Component {
  state = {
    tab: 0,
  };

  componentDidMount() {
    const { match, onGetMyPageUser } = this.props;
    onGetMyPageUser(match.params.id);
  }

  onChangeTab = (_, tab) => {
    this.setState({ tab });
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
    let hidden = false;

    if (selectedUser.user_id === myPageUser.user_id) {
      user = selectedUser;
      pinnedRoadmaps = user.pinned_roadmaps.map((roadmap) => {
        return (
          // temporary Roadmap Item
          <h1>
            <button
              id={`roadmap-${roadmap.id}`}
              type="button"
              onClick={() => history.push(`/roadmap/${roadmap.id}`)}
            >
              {roadmap.id}
            </button>
            {roadmap.title}
          </h1>
        );
      });
    } else {
      user = myPageUser;
      pinnedRoadmaps = [];
      hidden = true;
    }

    const myRoadmaps = user.my_roadmaps.map((roadmap) => {
      return (
        // temporary Roadmap Item
        <h1>
          <button
            id={`roadmap-${roadmap.id}`}
            type="button"
            onClick={() => history.push(`/roadmap/${roadmap.id}`)}
          >
            {roadmap.id}
          </button>
          {roadmap.title}
        </h1>
      );
    });

    return (
      <div className="MyPage">
        <div className="user-info">
          <img src={userImg} alt="user-img" width="500" height="500" />
          <h1>{user.username}</h1>
        </div>
        <AppBar position="relative">
          <Tabs
            id="mypage-tab"
            value={tab}
            onChange={this.onChangeTab}
            aria-label="simple tabs example"
            variant="fullWidth"
            centered
          >
            <Tab label="My Roadmaps" />
            <Tab label="Pinned Roadmaps" disabled={hidden} />
          </Tabs>
        </AppBar>
        <TabPanel value={tab} index={0}>
          {myRoadmaps}
        </TabPanel>
        <TabPanel value={tab} index={1}>
          {pinnedRoadmaps}
        </TabPanel>
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
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number,
  value: PropTypes.number,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MyPage));
