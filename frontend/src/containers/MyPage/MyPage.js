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
        <Box p={3}>
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

  onChangeTab = (event, tab) => {
    // eslint-disable-next-line no-debugger
    debugger;
    this.setState({ tab });
  };

  render() {
    const { selectedUser, myPageUser } = this.props;

    if (myPageUser === undefined) {
      return (
        <div className="MyPage">
          <div className="loading" />
        </div>
      );
    }

    const a11yProps = (index) => {
      return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
      };
    };

    const { tab } = this.state;

    if (selectedUser.user_id === myPageUser.user_id) {
      const myRoadmaps = selectedUser.my_roadmaps.map((roadmap) => {
        return <h1>{roadmap.title}</h1>;
      });
      const pinnedRoadmaps = selectedUser.pinned_roadmaps.map((roadmap) => {
        return <h1>{roadmap.title}</h1>;
      });

      return (
        <div className="MyPage">
          <AppBar position="relative">
            <Tabs
              value={tab}
              onChange={this.onChangeTab}
              aria-label="simple tabs example"
              variant="fullWidth"
              centered
            >
              <Tab label="My Roadmaps" {...a11yProps(0)} />
              <Tab label="Pinned Roadmaps" {...a11yProps(1)} />
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

    const myRoadmaps = myPageUser.my_roadmaps.map((roadmap) => {
      return <h1>{roadmap.title}</h1>;
    });

    return (
      <div className="MyPage">
        <AppBar position="relative">
          <Tabs
            value={tab}
            onChange={this.onChangeTab}
            aria-label="simple tabs example"
            variant="fullWidth"
            centered
          >
            <Tab label="My Roadmaps" {...a11yProps(0)} />
          </Tabs>
        </AppBar>
        <TabPanel value={tab} index={0}>
          {myRoadmaps}
        </TabPanel>
      </div>
    );
  }
}

MyPage.propTypes = {
  selectedUser: PropTypes.objectOf(PropTypes.any),
  myPageUser: PropTypes.objectOf(PropTypes.any),
  match: PropTypes.objectOf(PropTypes.any),
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
