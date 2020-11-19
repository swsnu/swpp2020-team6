import React, { Component } from "react";
// import FormGroup from "@material-ui/core/FormGroup";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import * as actionCreators from "../../store/actions/index";

import CreateSection from "../../components/CreateSection/CreateSection";
import { levelType } from "../../constants";
import "./EditRoadmap.scss";

class EditRoadmap extends Component {
  state = {
    received: false,
    isPrivate: false,
    title: "",
    level: 0,
    description: "",
    sections: [],
    tags: [],
    addedTagList: [],
    deletedTagList: [],
    newTag: "",
  };

  componentDidMount() {
    const { onGetRoadmap, match } = this.props;
    onGetRoadmap(match.params.id);
  }

  setInitialState = () => {
    const { selectedRoadmap } = this.props;
    this.setState({
      received: true,
      isPrivate: selectedRoadmap.private,
      title: selectedRoadmap.title,
      level: parseInt(selectedRoadmap.level, 10),
      description: selectedRoadmap.description,
      sections: selectedRoadmap.sections,
      tags: selectedRoadmap.tags.map((tag) => {
        return tag.tag_name;
      }),
    });
  };

  onClickPrivate = () => {
    const { isPrivate } = this.state;
    this.setState({ isPrivate: !isPrivate });
  };

  onChangeTitle = (title) => {
    this.setState({ title });
  };

  onChangeLevel = (level) => {
    this.setState({ level: parseInt(level, 10) });
  };

  onChangeDescription = (description) => {
    this.setState({ description });
  };

  onChangeNewTag = (newTag) => {
    this.setState({ newTag });
  };

  onClickAddTag = () => {
    const { tags, newTag, addedTagList } = this.state;
    this.setState({ tags: tags.concat(newTag) });
    this.setState({ addedTagList: addedTagList.concat(newTag) });
    this.setState({ newTag: "" });
  };

  onClickDeleteTag = (tag, id) => {
    const { tags, deletedTagList } = this.state;
    this.setState({ tags: tags.filter((_, index) => index !== id) });
    this.setState({ deletedTagList: deletedTagList.concat(tag) });
  };

  onClickCreateSection = () => {
    const { sections } = this.state;
    this.setState({ sections: sections.concat({ section_title: "", tasks: [] }) });
  };

  onClickDeleteSection = (tmpSectionId) => {
    const { sections } = this.state;
    this.setState({
      sections: sections.filter((_, index) => {
        return index !== tmpSectionId;
      }),
    });
  };

  onClickUpSection = (tmpSectionId) => {
    const { sections } = this.state;
    this.setState({
      sections: sections.map((section, index) => {
        if (index === tmpSectionId - 1) {
          return sections[index + 1];
        }
        if (index === tmpSectionId) {
          return sections[index - 1];
        }
        return section;
      }),
    });
  };

  onClickDownSection = (tmpSectionId) => {
    const { sections } = this.state;
    this.setState({
      sections: sections.map((section, index) => {
        if (index === tmpSectionId) {
          return sections[index + 1];
        }
        if (index === tmpSectionId + 1) {
          return sections[index - 1];
        }
        return section;
      }),
    });
  };

  onChangeSectionTitle = (tmpSectionId, title) => {
    const { sections } = this.state;
    this.setState({
      sections: sections.map((section, index) => {
        if (index === tmpSectionId) {
          section.section_title = title;
        }
        return section;
      }),
    });
  };

  onClickCreateTask = (tmpSectionId) => {
    const { sections } = this.state;
    this.setState({
      sections: sections.map((section, index) => {
        if (index === tmpSectionId) {
          return {
            ...section,
            tasks: section.tasks.concat({
              task_title: "",
              task_type: 0,
              task_url: "",
              task_description: "",
            }),
          };
        }
        return section;
      }),
    });
  };

  onClickDeleteTask = (tmpSectionId, tmpTaskId) => {
    const { sections } = this.state;
    this.setState({
      sections: sections.map((section, sectionIndex) => {
        if (sectionIndex === tmpSectionId) {
          return {
            ...section,
            tasks: section.tasks.filter((_, taskIndex) => {
              return taskIndex !== tmpTaskId;
            }),
          };
        }
        return section;
      }),
    });
  };

  onClickUpTask = (tmpSectionId, tmpTaskId) => {
    const { sections } = this.state;
    this.setState({
      sections: sections.map((section, sectionIndex) => {
        if (sectionIndex === tmpSectionId) {
          return {
            ...section,
            tasks: section.tasks.map((task, taskIndex) => {
              if (taskIndex === tmpTaskId - 1) {
                return section.tasks[taskIndex + 1];
              }
              if (taskIndex === tmpTaskId) {
                return section.tasks[taskIndex - 1];
              }
              return task;
            }),
          };
        }
        return section;
      }),
    });
  };

  onClickDownTask = (tmpSectionId, tmpTaskId) => {
    const { sections } = this.state;
    this.setState({
      sections: sections.map((section, sectionIndex) => {
        if (sectionIndex === tmpSectionId) {
          return {
            ...section,
            tasks: section.tasks.map((task, taskIndex) => {
              if (taskIndex === tmpTaskId) {
                return section.tasks[taskIndex + 1];
              }
              if (taskIndex === tmpTaskId + 1) {
                return section.tasks[taskIndex - 1];
              }
              return task;
            }),
          };
        }
        return section;
      }),
    });
  };

  onChangeTaskTitle = (tmpSectionId, tmpTaskId, title) => {
    const { sections } = this.state;
    this.setState({
      sections: sections.map((section, sectionIndex) => {
        if (sectionIndex === tmpSectionId) {
          return {
            ...section,
            tasks: section.tasks.map((task, taskIndex) => {
              if (taskIndex === tmpTaskId) {
                return { ...task, task_title: title };
              }
              return task;
            }),
          };
        }
        return section;
      }),
    });
  };

  onChangeTaskType = (tmpSectionId, tmpTaskId, type) => {
    const { sections } = this.state;
    this.setState({
      sections: sections.map((section, sectionIndex) => {
        if (sectionIndex === tmpSectionId) {
          return {
            ...section,
            tasks: section.tasks.map((task, taskIndex) => {
              if (taskIndex === tmpTaskId) {
                return { ...task, task_type: parseInt(type, 10) };
              }
              return task;
            }),
          };
        }
        return section;
      }),
    });
  };

  onChangeTaskUrl = (tmpSectionId, tmpTaskId, url) => {
    const { sections } = this.state;
    this.setState({
      sections: sections.map((section, sectionIndex) => {
        if (sectionIndex === tmpSectionId) {
          return {
            ...section,
            tasks: section.tasks.map((task, taskIndex) => {
              if (taskIndex === tmpTaskId) {
                return { ...task, task_url: url };
              }
              return task;
            }),
          };
        }
        return section;
      }),
    });
  };

  onChangeTaskDescription = (tmpSectionId, tmpTaskId, description) => {
    const { sections } = this.state;
    this.setState({
      sections: sections.map((section, sectionIndex) => {
        if (sectionIndex === tmpSectionId) {
          return {
            ...section,
            tasks: section.tasks.map((task, taskIndex) => {
              if (taskIndex === tmpTaskId) {
                return { ...task, task_description: description };
              }
              return task;
            }),
          };
        }
        return section;
      }),
    });
  };

  onClickEditBack = () => {
    const { history, onResetRoadmap } = this.props;
    const back = window.confirm("Leave the page? Changes you made will be deleted.");
    if (back) {
      onResetRoadmap();
      history.goBack();
    }
  };

  onClickEditConfirm = () => {
    const {
      isPrivate,
      title,
      level,
      description,
      sections,
      tags,
      addedTagList,
      deletedTagList,
    } = this.state;
    const { match, onEditRoadmap } = this.props;
    const roadmapData = {
      private: isPrivate,
      title,
      level,
      description,
      sections,
      tags,
      addedTagList,
      deletedTagList,
    };
    onEditRoadmap(match.params.id, roadmapData);
  };

  render() {
    const { selectedRoadmap, selectedUser } = this.props;

    if (selectedUser === undefined) {
      window.alert("Please sign in!");
      return <div />;
    }
    if (selectedRoadmap === undefined) {
      return (
        <div className="EditRoadmap">
          <div className="loading" />
        </div>
      );
    }
    if (selectedRoadmap.author_id !== selectedUser.user_id) {
      const { history } = this.props;
      window.alert("Only the author can edit the Roadmap!");
      history.goBack();
      return <div />;
    }

    const { received, isPrivate, title, sections, level, description, tags, newTag } = this.state;

    if (received === false) {
      this.setInitialState();
    }
    const taglist = tags.map((tag, index) => {
      return (
        <div className="tags">
          <p key={tag}>{tag}</p>
          <button
            className="delete-tag"
            type="button"
            onClick={() => this.onClickDeleteTag(tag, index)}
          >
            delete
          </button>
        </div>
      );
    });

    const EditSections = sections.map((section, index) => {
      return (
        <CreateSection
          tmpSectionId={index}
          sectionLastId={sections.length - 1}
          title={section.section_title}
          tasks={section.tasks}
          clickDeleteSectionHandler={this.onClickDeleteSection}
          clickUpSectionHandler={this.onClickUpSection}
          clickDownSectionHandler={this.onClickDownSection}
          changeSectionTitleHandler={this.onChangeSectionTitle}
          clickCreateTaskHandler={this.onClickCreateTask}
          clickDeleteTaskHandler={this.onClickDeleteTask}
          clickUpTaskHandler={this.onClickUpTask}
          clickDownTaskHandler={this.onClickDownTask}
          changeTaskTitleHandler={this.onChangeTaskTitle}
          changeTaskTypeHandler={this.onChangeTaskType}
          changeTaskUrlHandler={this.onChangeTaskUrl}
          changeTaskDescriptionHandler={this.onChangeTaskDescription}
        />
      );
    });

    return (
      <div className="EditRoadmap">
        <h1>Edit Roadmap</h1>
        <div className="roadmap">
          <label>
            Private
            <Switch
              id="roadmap-private"
              checked={isPrivate}
              onClick={() => this.onClickPrivate()}
            />
          </label>
          <label>Roadmap Title</label>
          <input
            id="roadmap-title"
            type="text"
            value={title}
            onChange={(event) => this.onChangeTitle(event.target.value)}
          />
          <br />
          <select
            id="roadmap-level"
            value={level}
            onChange={(event) => {
              return this.onChangeLevel(event.target.value);
            }}
          >
            Level
            <option value={0}>Choose level</option>
            <option value={levelType.BASIC}>Basic</option>
            <option value={levelType.INTERMEDIATE}>Intermediate</option>
            <option value={levelType.ADVANCED}>Advanced</option>
          </select>
          <br />
          <label>Tags</label>
          {taglist}
          <input
            id="new-tag"
            value={newTag}
            onChange={(event) => this.onChangeNewTag(event.target.value)}
          />
          <button id="add-tag-button" type="button" onClick={() => this.onClickAddTag()}>
            add
          </button>
          <br />
          <label>Description</label>
          <input
            id="roadmap-description"
            value={description}
            onChange={(event) => this.onChangeDescription(event.target.value)}
          />
        </div>
        <div className="sections">
          {EditSections}
          <button
            type="button"
            id="create-section-button"
            onClick={() => this.onClickCreateSection()}
          >
            Create Section
          </button>
        </div>
        <div className="buttons">
          <button
            id="back-edit-roadmap-button"
            type="button"
            onClick={() => this.onClickEditBack()}
          >
            Back
          </button>
          <button
            id="confirm-edit-roadmap-button"
            type="button"
            disabled={title === "" || level === 0 || sections.length === 0}
            onClick={() => this.onClickEditConfirm()}
          >
            Confirm
          </button>
        </div>
      </div>
    );
  }
}

EditRoadmap.propTypes = {
  selectedRoadmap: PropTypes.objectOf(PropTypes.any),
  selectedUser: PropTypes.objectOf(PropTypes.any),
  onGetRoadmap: PropTypes.func.isRequired,
  onEditRoadmap: PropTypes.func.isRequired,
  onResetRoadmap: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any),
  match: PropTypes.objectOf(PropTypes.any),
};

const mapStateToProps = (state) => {
  return {
    selectedRoadmap: state.roadmap.selectedRoadmap,
    selectedUser: state.user.selectedUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetRoadmap: (roadmapId) => dispatch(actionCreators.getRoadmap(roadmapId)),
    onEditRoadmap: (roadmapId, roadmapData) =>
      dispatch(actionCreators.editRoadmap(roadmapId, roadmapData)),
    onResetRoadmap: () => dispatch(actionCreators.resetRoadmap_()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditRoadmap));
