import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as actionCreators from "../../store/actions/index";
import "./RoadmapDetail.css";
import Comment from "../../components/Comment";
import ProgressBar from "../../components/RoadmapDetail/ProgressBar";
// import Error from "../Error/Error";
import RoadmapButtons from "./RoadmapButtons";
import Section from "../../components/RoadmapDetail/Section";

class RoadmapDetail extends Component {
  state = {
    comment: "",
  };

  componentDidMount() {
    const { selectedUser, roadmapErrorStatus, onGetRoadmap, match } = this.props;
    if (selectedUser !== null && !roadmapErrorStatus) {
      onGetRoadmap(parseInt(match.params.id, 10));
    }
  }

  backToList = () => {
    const { onResetRoadmap, history } = this.props;
    onResetRoadmap();
    history.back();
  };

  /* ---------------- Roadmap Progress -------------------- */
  onChangeRoadmapProgressStatus = (type) => {
    let newState;
    switch (type) {
      case "start":
        newState = 2;
        break;
      case "quit":
        newState = 1;
        break;
      case "finish":
        newState = 3;
        break;
      case "clear":
        // eslint-disable-next-line no-unused-vars
        newState = 1;
        break;
      default:
        break;
    }
    // changeRoadmapProgress(newState, parseInt(match.params.id, 10));
  };

  /* ---------------- comment handlers -------------------- */
  commentCreateHandler = (comment) => {
    const { onCreateComment, match } = this.props;
    onCreateComment(match.params.id, comment);
  };

  commentEditHandler = (commentID, comment) => {
    const { onEditComment, match } = this.props;
    onEditComment(commentID, match.params.id, comment);
  };

  commentDeleteHandler = (id) => {
    const { onDeleteComment } = this.props;
    onDeleteComment(id);
  };

  render() {
    const { selectedUser, isSignedIn, match, selectedRoadmap, roadmapErrorStatus } = this.props;
    const roadmapId = parseInt(match.params.id, 10);

    if (isSignedIn === null) {
      // unsigned in user
      const { history } = this.props;
      history.goBack();
      return <div />;
    }
    if (roadmapErrorStatus) {
      // error while getting the roadmap
      const { history } = this.props;
      history.goBack();
      return <div />;
    }
    if (selectedRoadmap === undefined) {
      // waiting to get the roadmap data
      return (
        <div className="RoadmapDetail">
          <div className="Loading" />
        </div>
      );
    }

    // safe zone (selectedUser !== null/undefined,  selectedRoadmap !== null/undefined)
    const { title, sections, comments, level } = selectedRoadmap;

    /* ---------------- Roadmap level -------------------- */
    let roadmapLevel;
    const levelString = ["  ", "Basic", "Intermediate", "Advanced"];
    switch (level) {
      case 1:
        roadmapLevel = <p id="basic-level">{levelString[1]}</p>;
        break;
      case 2:
        roadmapLevel = <p id="intermediate-level">{levelString[2]}</p>;
        break;
      case 3:
        roadmapLevel = <p id="advanced-level">{levelString[3]}</p>;
        break;
      default:
        roadmapLevel = <p id="null-level">{levelString[0]}</p>;
        break;
    }

    /* ---------------- Roadmap sections -------------------- */
    const roadmapSections = sections.map((section) => {
      return (
        <Section
          key={section.section_id}
          isAuthor={selectedRoadmap.author_id === selectedUser.user_id}
          progressStatus={selectedRoadmap.progress}
          title={section.section_title}
          tasks={section.tasks}
        />
      );
    });

    /* ---------------- Roadmap tags -------------------- */
    const roadmapTags = selectedRoadmap.tags.map((item) => {
      return <p key={item.tag_id}>{item.tag_name}</p>;
    });

    /* ---------------- Roadmap comments -------------------- */
    const roadmapComments = comments.map((comment) => {
      return (
        <Comment
          key={comment.comment_id}
          authorName={comment.author_name}
          isAuthor={comment.author_id === selectedUser.user_id}
          authorPictureUrl={comment.author_picture_url}
          content={comment.content}
          clickEdit={() => this.commentEditHandler(comment.comment_id, comment)}
          clickDelete={() => this.commentDeleteHandler(comment.comment_id)}
        />
      );
    });

    let commentConfirmButton = (
      <button id="confirm-create-comment-button" type="button" disabled>
        confirm
      </button>
    );
    const { comment } = this.state;
    if (comment !== "") {
      commentConfirmButton = (
        <button
          id="confirm-create-comment-button"
          type="button"
          onClick={() => this.commentCreateHandler(comment)}
        >
          confirm
        </button>
      );
    }

    return (
      <div className="roadmap-detail">
        <div className="header" />
        <div className="row">
          <div className="leftcolumn">
            <ProgressBar
              isAuthor={selectedUser.user_id === selectedRoadmap.author_id}
              onChangeRoadmapProgressStatus={this.onChangeRoadmapProgressStatus}
              currentProgressStatus={selectedRoadmap.progress}
            />
            <h1 className="roadmap-title">{title}</h1>
            <div className="roadmap-author">
              <p>{selectedRoadmap.author_picture_url}</p>
              <p id="roadmap-author-name">{selectedRoadmap.author_name}</p>
              <p id="roadmap-written-date">{selectedRoadmap.date}</p>
            </div>
            {roadmapLevel}
            <div className="roadmap-tags">{roadmapTags}</div>
            <div className="roadmap-sections">{roadmapSections}</div>
          </div>
          <div className="rightcolumn">
            <div className="roadmap-panel">
              <div className="roadmap-statistics">
                <p id="roadmap-like-count">
                  Like
                  {selectedRoadmap.like_count}
                </p>
                <p id="roadmap-pin-count">
                  pinned
                  {selectedRoadmap.pin_count}
                </p>
                <p id="roadmap-comment-count">
                  comments
                  {selectedRoadmap.comment_count}
                </p>
              </div>
              <RoadmapButtons // change to comopnent and send funcs
                roadmapId={roadmapId}
                isAuthor={selectedRoadmap.author_id === selectedUser.user_id}
              />
            </div>
            <div className="comment-input">
              <textarea
                id="new-comment-content-input"
                rows="4"
                cols="100"
                type="text"
                value={comment}
                onChange={
                  (event) => {
                    this.setState({ comment: event.target.value });
                  }
                  // eslint-disable-next-line react/jsx-curly-newline
                }
              />
              {commentConfirmButton}
            </div>
            <div className="roadmap-comments">{roadmapComments}</div>
          </div>
        </div>
      </div>
    );
  }
}

RoadmapDetail.propTypes = {
  selectedUser: PropTypes.objectOf(PropTypes.any).isRequired,
  isSignedIn: PropTypes.bool.isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,

  selectedRoadmap: PropTypes.objectOf(PropTypes.any).isRequired,
  roadmapErrorStatus: PropTypes.bool.isRequired,

  onGetRoadmap: PropTypes.func.isRequired,
  onResetRoadmap: PropTypes.func.isRequired,

  onCreateComment: PropTypes.func.isRequired,
  onEditComment: PropTypes.func.isRequired,
  onDeleteComment: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetRoadmap: (id) => dispatch(actionCreators.getRoadmap(id)),
    onResetRoadmap: () => dispatch(actionCreators.resetRoadmap_()),
    onCreateComment: (roadmapId, comment) =>
      dispatch(actionCreators.createComment({ roadmap_id: roadmapId, content: comment })),
    onEditComment: (commentID, roadmapID, comment) =>
      dispatch(actionCreators.editComment(commentID, { roadmap_id: roadmapID, content: comment })),
    onDeleteComment: (id) => dispatch(actionCreators.deleteComment(id)),
  };
};

const mapStateToProps = (state) => {
  return {
    selectedUser: state.user.selectedUser,
    isSignedIn: state.user.isSignedIn,
    selectedRoadmap: state.roadmap.selectedRoadmap,
    roadmapErrorStatus: state.roadmap.errorStatus,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoadmapDetail);
