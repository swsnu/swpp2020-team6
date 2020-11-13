import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as actionCreators from "../../store/actions/index";
import "./RoadmapDetail.css";
import Comment from "../../components/Comment";
import ProgressBar from "../../components/RoadmapDetail/ProgressBar";
import RoadmapButtons from "./RoadmapButtons";
import Section from "../../components/RoadmapDetail/Section";

class RoadmapDetail extends Component {
  state = {
    comment: "",
  };

  componentDidMount() {
    const { onGetRoadmap, match } = this.props;
    onGetRoadmap(parseInt(match.params.id, 10));
  }

  backToList = () => {
    const { onResetRoadmap, history } = this.props;
    onResetRoadmap();
    history.back();
  };

  /* ---------------- Roadmap Progress -------------------- */
  onChangeRoadmapProgressStatus = () => {
    // Progress tracking isn't implemented yet.
    /*
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
        newState = 1;
        break;
      default:
        break;
    }
    changeRoadmapProgress(newState, parseInt(match.params.id, 10));
    */
  };

  /* ---------------- comment handlers -------------------- */
  commentEditHandler = () => {};

  commentDeleteHandler = () => {};

  onPostComment = () => {};

  render() {
    const { selectedUser, isSignedIn, match, selectedRoadmap } = this.props;
    const roadmapId = parseInt(match.params.id, 10);

    if (isSignedIn === false) {
      // unsigned in user
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
    // eslint-disable-next-line camelcase
    const { title, sections, comments, level, original_author_id, author_id } = selectedRoadmap;

    /* ---------------- Original Author -------------------- */
    const originalAuthor =
      // (inevitable since we use the data from the backend directly)
      // eslint-disable-next-line camelcase
      original_author_id !== author_id ? (
        <div className="roadmap-original-author">
          <p id="roadmap-original-author-name">{selectedRoadmap.original_author_name}</p>
        </div>
      ) : null;

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
      return (
        <p key={item.tag_id} className="roadmap-tag">
          {item.tag_name}
        </p>
      );
    });

    /* ---------------- Roadmap comments -------------------- */
    const roadmapComments = comments.map((commentItem) => {
      return (
        <Comment
          key={commentItem.comment_id}
          authorName={commentItem.author_name}
          isAuthor={commentItem.author_id === selectedUser.user_id}
          authorPictureUrl={commentItem.author_picture_url}
          content={commentItem.content}
          clickEdit={() => this.commentEditHandler(commentItem)}
          clickDelete={() => this.commentDeleteHandler(commentItem.comment_id)}
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
        <button id="confirm-create-comment-button" type="button" onClick={this.onPostComment}>
          confirm
        </button>
      );
    }

    return (
      <div className="RoadmapDetail">
        <div className="header" />
        <div className="row">
          <div className="leftcolumn">
            <ProgressBar
              isAuthor={selectedUser.user_id === selectedRoadmap.author_id}
              onChangeRoadmapProgressStatus={() => this.onChangeRoadmapProgressStatus()}
              currentProgressStatus={selectedRoadmap.progress}
            />
            <h1 className="roadmap-title">{title}</h1>
            <div className="roadmap-author">
              <p id="roadmap-author-picture-url">{selectedRoadmap.author_user_picture_url}</p>
              <p id="roadmap-author-name">{selectedRoadmap.author_name}</p>
              <p id="roadmap-written-date">{selectedRoadmap.date}</p>
            </div>
            {originalAuthor}
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
                  Pinned
                  {selectedRoadmap.pin_count}
                </p>
                <p id="roadmap-comment-count">
                  Comments
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
                  (event) => this.setState({ comment: event.target.value })
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

  onGetRoadmap: PropTypes.func.isRequired,
  onResetRoadmap: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetRoadmap: (id) => dispatch(actionCreators.getRoadmap(id)),
    onResetRoadmap: () => dispatch(actionCreators.resetRoadmap_()),
  };
};

const mapStateToProps = (state) => {
  return {
    selectedUser: state.user.selectedUser,
    isSignedIn: state.user.isSignedIn,
    selectedRoadmap: state.roadmap.selectedRoadmap,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoadmapDetail);
