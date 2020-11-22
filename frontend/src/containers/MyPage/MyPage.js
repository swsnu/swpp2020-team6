import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import StyledMyPage from "../../components/MyPage/StyledComponents/StyledMyPage";
import * as actionCreators from "../../store/actions/index";
import userImg from "../../misc/rotus-img.png";
import "./MyPage.scss";

const TmpRoadmapItem = (props) => {
  const { roadmap, history } = props;
  return (
    <div className="TmpRoadmapItem">
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
    </div>
  );
};

TmpRoadmapItem.propTypes = {
  roadmap: PropTypes.objectOf(PropTypes.any),
  history: PropTypes.objectOf(PropTypes.any),
};

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
    let disabled = false;

    if (selectedUser.user_id === myPageUser.user_id) {
      user = selectedUser;
      pinnedRoadmaps = user.pinned_roadmaps.map((roadmap) => {
        return <TmpRoadmapItem roadmap={roadmap} history={history} />;
      });
    } else {
      user = myPageUser;
      pinnedRoadmaps = [];
      disabled = true;
    }

    const myRoadmaps = user.my_roadmaps.map((roadmap) => {
      return <TmpRoadmapItem roadmap={roadmap} history={history} />;
    });

    return (
      <div className="MyPage">
        <>
          <CssBaseline />
          <Container maxWidth="lg">
            <Typography component="div" style={{ backgroundColor: "#FFF4E8" }}>
              <Box display="flex" flexDirection="row">
                <Box id="user-info">
                  <h1>User Info</h1>
                  <img src={userImg} alt="user-img" width="200" height="200" border="1px solid" />
                  <h2>{user.username}</h2>
                </Box>
                <Box id="mypage-tab">
                  <StyledMyPage
                    tab={tab}
                    onChange={this.onChangeTab}
                    disabled={disabled}
                    myRoadmaps={myRoadmaps}
                    pinnedRoadmaps={pinnedRoadmaps}
                  />
                </Box>
              </Box>
            </Typography>
          </Container>
        </>
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
