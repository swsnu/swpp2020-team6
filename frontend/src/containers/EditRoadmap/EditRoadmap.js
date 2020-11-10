import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import * as actionCreators from "../../store/actions/index";

import EditSection from "../../components/CreateSection/CreateSection";
import Error from "../Error/Error";
import { levelType } from "../../constants";

class EditRoadmap extends Component {
  state = {
    title: null,
    level: 0,
    sections: [],
    tags: [],
    addedTagList: [],
    deletedTagList: [],
  };

  componentDidMount() {
    const { onGetRoadmap, match } = this.props;
    onGetRoadmap(match.params.id);
  }

  onClickLevel = (level) => {
    this.setState({ level });
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
                return { ...task, task_type: type };
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
    const { selectedRoadmap, history } = this.props;
    const back = confirm("Leave the page? Changes you made will be deleted.");
    if (back) {
      history.push(`/roadmap/${selectedRoadmap.roadmap_id}`);
    }
  };

  onClickEditConfirm = () => {
    const { title, level, sections, tags, addedTagList, deletedTagList } = this.state;
    const { match, onEditRoadmap } = this.props;
    const roadmapData = {
      title,
      level,
      sections,
      tags,
      addedTagList,
      deletedTagList,
    };
    onEditRoadmap(match.params.id, roadmapData);
  };

  render() {
    const { isSignedIn, selectedRoadmap, errorStatus } = this.props;
    if (isSignedIn === false) {
      alert("Please sign in!");
      return (
        <div className="EditRoadmap">
          <div className="error">
            <Error />
          </div>
        </div>
      );
    }
    if (errorStatus === true) {
      alert("No such Roadmap!");
      return (
        <div className="EditRoadmap">
          <div className="error">
            <Error />
          </div>
        </div>
      );
    }
    if (selectedRoadmap === undefined) {
      return (
        <div className="EditRoadmap">
          <div className="loading" />
        </div>
      );
    }

    const { sections, level, title } = this.state;
    // eslint-disable-next-line no-debugger
    debugger;
    if (title === null) {
      this.setState({
        title: selectedRoadmap.title,
        level: selectedRoadmap.level,
        sections: selectedRoadmap.sections,
      });
    }

    const EditSections = sections.map((section, index) => {
      // eslint-disable-next-line no-debugger
      debugger;
      return (
        <EditSection
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
          <input
            id="roadmap-title"
            type="text"
            value={title}
            onChange={(event) => this.setState({ title: event.target.value })}
          />
          <select
            id="roadmap-level"
            value={level}
            onChange={(event) => this.onClickLevel(event.target.value)}
          >
            Level
            <option selected value={0}>
              Choose level
            </option>
            <option value={levelType.BASIC}>Basic</option>
            <option value={levelType.INTERMEDIATE}>Intermediate</option>
            <option value={levelType.ADVANCED}>Advanced</option>
          </select>
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
      </div>
    );
  }
}

EditRoadmap.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
  selectedRoadmap: PropTypes.objectOf(PropTypes.any).isRequired,
  errorStatus: PropTypes.bool.isRequired,
  onGetRoadmap: PropTypes.func.isRequired,
  onEditRoadmap: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => {
  return {
    selectedRoadmap: state.roadmap.selectedRoadmap,
    errorStatus: state.roadmap.errorStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetRoadmap: (roadmapId) => dispatch(actionCreators.getRoadmap(roadmapId)),
    onEditRoadmap: (roadmapId, roadmapData) =>
      dispatch(actionCreators.editRoadmap(roadmapId, roadmapData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditRoadmap));
