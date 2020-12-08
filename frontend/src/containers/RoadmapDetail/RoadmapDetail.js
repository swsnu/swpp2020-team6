/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import ExpandLessOutlinedIcon from "@material-ui/icons/ExpandLessOutlined";
import * as actionCreators from "../../store/actions/index";
import "./RoadmapDetail.scss";
import Comment from "../../components/Comment/Comment";
import ProgressBar from "../../components/RoadmapDetail/ProgressBar";
import RoadmapButtons from "./RoadmapButtons";
import Section from "../../components/RoadmapDetail/Section";
import UserCard from "../../components/RoadmapDetail/UserCard";
import RoadmapLevelIcon from "../../components/SimpleRoadmap/RoadmapLevelIcon";

const Transition = React.forwardRef(function Transition(props, ref) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Slide direction="up" ref={ref} {...props} />;
});

class RoadmapDetail extends Component {
  state = {
    received: false,
    edittedComments: null,
    commentEditMode: null,
    open: true,
    sectionCollapse: [],
  };

  componentDidMount() {
    const { onGetRoadmap, match } = this.props;
    onGetRoadmap(parseInt(match.params.id, 10));
  }

  componentWillUnmount() {
    const { onResetRoadmap } = this.props;
    onResetRoadmap();
  }

  /* ---------------- Section Collapse -------------------- */

  setInitialState = () => {
    const { selectedRoadmap } = this.props;

    this.setState({
      sectionCollapse: selectedRoadmap.sections.map(() => {
        return false;
      }),
      commentEditMode: selectedRoadmap.comments.map(() => {
        return false;
      }),
      edittedComments: selectedRoadmap.comments.map((comment) => {
        return comment.content;
      }),
      received: true,
    });
  };

  onClickSectionCollapse = (tmpSectionId) => {
    const { sectionCollapse } = this.state;
    this.setState({
      sectionCollapse: sectionCollapse.map((collapse, id) => {
        if (id === tmpSectionId) {
          return !collapse;
        }
        return collapse;
      }),
    });
  };

  /* ---------------- task progress -------------------- */

  calcProgress = () => {
    const { selectedRoadmap } = this.props;
    let taskNum = 0;
    let checkedNum = 0;
    selectedRoadmap.sections.forEach((section) => {
      taskNum += section.tasks.length;
      section.tasks.forEach((task) => {
        if (task.task_checked) {
          checkedNum += 1;
        }
      });
    });
    return (checkedNum / taskNum) * 100;
  };

  /* ---------------- Roadmap Progress -------------------- */
  onChangeRoadmapProgressStatus = (type) => {
    const { changeRoadmapProgress, match } = this.props;
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
  };

  /* ---------------- comment handlers -------------------- */

  commentCreateHandler = (commentData) => {
    const { comment } = this.state;
    const { onCreateComment, match } = this.props;
    if (comment !== "") {
      onCreateComment(match.params.id, commentData);
      this.setState({ comment: "" });
    }
  };

  commentEditHandler = (tmpCommentId) => {
    const { commentEditMode } = this.state;
    this.setState({
      commentEditMode: commentEditMode.map((mode, index) => {
        if (index === tmpCommentId) {
          return true;
        }
        return mode;
      }),
    });
  };

  commentEditChangeHandler = (tmpCommentId, edittedComment) => {
    const { edittedComments } = this.state;

    this.setState({
      edittedComments: edittedComments.map((comment, index) => {
        if (index === tmpCommentId) {
          return edittedComment;
        }
        return comment;
      }),
    });
  };

  commentEditConfirmHandler = (tmpCommentId, commentId) => {
    const { onEditComment, match } = this.props;
    const { edittedComments, commentEditMode } = this.state;
    onEditComment(commentId, match.params.id, edittedComments[tmpCommentId]);

    this.setState({
      commentEditMode: commentEditMode.map((mode, index) => {
        if (index === tmpCommentId) {
          return false;
        }
        return mode;
      }),
    });
  };

  commentDeleteHandler = (tmpCommentId, commentId) => {
    const { onDeleteComment } = this.props;
    const { commentEditMode } = this.state;

    const yes = window.confirm("Are you sure to delete the comment?");

    if (yes) {
      this.setState({
        commentEditMode: commentEditMode.map((mode, index) => {
          if (index === tmpCommentId) {
            return false;
          }
          return mode;
        }),
      });
      onDeleteComment(commentId);
    }
  };

  handleClose = () => {
    this.setState({ open: false });
    const { history } = this.props;
    history.goBack();
  };

  render() {
    const { selectedUser, isSignedIn, match, selectedRoadmap } = this.props;

    if (isSignedIn === false) {
      // unsigned in user
      return <div className="RoadmapDetail" />;
    }
    if (selectedRoadmap === undefined) {
      // waiting to get the roadmap data
      return (
        <div className="RoadmapDetail">
          <div className="Loading">Loading...</div>
        </div>
      );
    }

    if (selectedRoadmap.private && selectedRoadmap.author_id !== selectedUser.user_id) {
      // if the roadmap's private field is set true and the user isn't the author
      // show that only the author can view it
      const { open } = this.state;

      // later the return statement will be replaced with the material-ui's Dialog
      return (
        <div className="RoadmapDetail">
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">Private page!</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Only the author can access this Roadmap. If you press the OK button, you will be
                redirected to your previous page.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }

    // safe zone (selectedUser !== null/undefined,  selectedRoadmap !== null/undefined)

    const { received } = this.state;
    if (!received) {
      this.setInitialState();
    }

    /* ---------------- Original Author -------------------- */
    const originalAuthor =
      // (inevitable since we use the data from the backend directly)
      // eslint-disable-next-line camelcase
      selectedRoadmap.original_author_id !== selectedRoadmap.author_id ? (
        <div className="roadmap-original-author">
          Duplicated from:
          {` ${selectedRoadmap.original_author_name}`}
        </div>
      ) : null;

    /* ---------------- Roadmap sections -------------------- */
    const { sectionCollapse } = this.state;
    const { onChangeCheckbox, history } = this.props;
    const roadmapSections = selectedRoadmap.sections.map((section, index) => {
      return (
        <Section
          key={section.section_id}
          collapse={sectionCollapse[index]}
          tmpSectionId={index}
          isAuthor={selectedRoadmap.author_id === selectedUser.user_id}
          progressStatus={selectedRoadmap.progress}
          title={section.section_title}
          tasks={section.tasks}
          clickSectionCollapse={this.onClickSectionCollapse}
          changeCheckbox={onChangeCheckbox}
        />
      );
    });

    /* ---------------- Roadmap tags -------------------- */
    const roadmapTags = selectedRoadmap.tags.map((item) => {
      return (
        <div key={item.tag_id} className="roadmap-tag">
          {item.tag_name}
        </div>
      );
    });

    /* ---------------- Roadmap comments -------------------- */
    const { edittedComments, commentEditMode } = this.state;
    const roadmapComments = selectedRoadmap.comments.map((commentItem, index) => {
      return (
        <Comment
          key={commentItem.comment_id}
          commentId={commentItem.comment_id}
          tmpCommentId={index}
          authorId={commentItem.author_id}
          authorName={commentItem.author_name}
          isAuthor={commentItem.author_id === selectedUser.user_id}
          content={commentItem.content}
          clickEdit={this.commentEditHandler}
          changeEdit={this.commentEditChangeHandler}
          clickEditConfirm={this.commentEditConfirmHandler}
          clickDelete={this.commentDeleteHandler}
          history={history}
          edittedComments={edittedComments}
          commentEditMode={commentEditMode}
        />
      );
    });

    const { comment } = this.state;
    let commentDisabled = true;

    if (comment !== "") {
      commentDisabled = false;
    }
    const commentConfirmButton = (
      <button
        id="confirm-create-comment-button"
        type="button"
        onClick={() => this.commentCreateHandler(comment)}
        disabled={commentDisabled}
      >
        Confirm
      </button>
    );

    return (
      <div className="RoadmapDetail">
        <div className="emptycolumn" />
        <div className="leftcolumn">
          <a name="top" />
          <div className="roadmap-info">
            <div className="roadmap-image-wrapper">
              <img
                id="roadmap-image"
                src={require(`misc/roadmap/${selectedRoadmap.image_id}.png`)}
                alt="roadmap"
              />
            </div>
            <div className="title-author-level-tags">
              <div className="roadmap-title">{selectedRoadmap.title}</div>
              {originalAuthor}
              <div className="roadmap-level">
                <RoadmapLevelIcon roadmapLevel={selectedRoadmap.level} />
              </div>
              <div className="roadmap-tags">{roadmapTags}</div>
              <div id="roadmap-written-date">{selectedRoadmap.date}</div>
            </div>
          </div>
          <div className="roadmap">
            <a name="roadmap-description" />
            <div className="roadmap-description">{selectedRoadmap.description}</div>
            <a name="roadmap-sections" />
            <div className="roadmap-sections">{roadmapSections}</div>
          </div>
          <div className="comments">
            <a name="roadmap-comments" />
            <div id="roadmap-comment-count">
              {`${selectedRoadmap.comment_count} `}
              Comments
            </div>
            <div className="comment-input">
              <textarea
                id="new-comment-content-input"
                rows="4"
                cols="100"
                value={comment}
                placeholder="New Comment"
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
        <div className="rightcolumn">
          <div className="roadmap-panel">
            <ProgressBar
              isAuthor={selectedUser.user_id === selectedRoadmap.author_id}
              onChangeRoadmapProgressStatus={this.onChangeRoadmapProgressStatus}
              currentProgressStatus={selectedRoadmap.progress}
              progressPercentage={this.calcProgress()}
            />
            <div
              className="roadmap-author"
              style={{
                display: selectedRoadmap.author_id === selectedUser.user_id ? "none" : "block",
              }}
            >
              <UserCard
                authorName={selectedRoadmap.author_name}
                authorId={selectedRoadmap.author_id}
                history={history}
              />
            </div>
            <RoadmapButtons // change to comopnent and send funcs
              buttonsRoadmapId={parseInt(match.params.id, 10)}
              isAuthor={selectedRoadmap.author_id === selectedUser.user_id}
              likeCount={selectedRoadmap.like_count}
              pinCount={selectedRoadmap.pin_count}
              commentCount={selectedRoadmap.comment_count}
            />
          </div>
        </div>
        <div className="anchors">
          <a className="top-anchor" href="#top">
            <ExpandLessOutlinedIcon />
            Top
          </a>
        </div>
      </div>
    );
  }
}

RoadmapDetail.propTypes = {
  selectedUser: PropTypes.objectOf(PropTypes.any),
  isSignedIn: PropTypes.bool,
  match: PropTypes.objectOf(PropTypes.any),
  history: PropTypes.objectOf(PropTypes.any),

  selectedRoadmap: PropTypes.objectOf(PropTypes.any),

  onGetRoadmap: PropTypes.func.isRequired,
  onResetRoadmap: PropTypes.func.isRequired,

  onCreateComment: PropTypes.func.isRequired,
  onEditComment: PropTypes.func.isRequired,
  onDeleteComment: PropTypes.func.isRequired,

  changeRoadmapProgress: PropTypes.func.isRequired,
  onChangeCheckbox: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetRoadmap: (id) => dispatch(actionCreators.getRoadmap(id)),
    onResetRoadmap: () => dispatch(actionCreators.resetRoadmap_()),
    onCreateComment: (roadmapId, comment) =>
      dispatch(actionCreators.createComment({ roadmap_id: roadmapId, content: comment })),
    onEditComment: (commentId, roadmapId, comment) =>
      dispatch(actionCreators.editComment(commentId, { roadmap_id: roadmapId, content: comment })),
    onDeleteComment: (id) => dispatch(actionCreators.deleteComment(id)),
    changeRoadmapProgress: (newState, roadmapId) =>
      dispatch(actionCreators.changeProgress({ progress_state: newState }, roadmapId)),
    onChangeCheckbox: (taskId) => dispatch(actionCreators.changeCheckbox(taskId)),
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
