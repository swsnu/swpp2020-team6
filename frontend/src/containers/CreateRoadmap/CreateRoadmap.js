import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import * as actionCreators from "../../store/actions/index";

import CreateSection from "../../components/CreateSection/CreateSection";
import { levelType } from "../../constants";

class CreateRoadmap extends Component {
  state = {
    title: "",
    level: levelType.BASIC,
    sections: [],
  };

  componentDidMount() {
    const { selectedUser, history } = this.props;
    if (selectedUser === null) {
      history.push("/signin");
    }
  }

  onChangeTitle = (title) => {
    this.setState({ title });
  };

  onChangeLevel = (level) => {
    this.setState({ level });
  };

  onClickCreateSection = () => {
    const { sections } = this.state;
    this.setState({ sections: sections.concat({ title: "", tasks: [] }) });
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
          section.title = title;
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
              title: "",
              type: 0,
              url: "",
              description: "",
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
                return { ...task, title };
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
                return { ...task, type };
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
                return { ...task, url };
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
                return { ...task, description };
              }
              return task;
            }),
          };
        }
        return section;
      }),
    });
  };

  onClickCreateBack = () => {
    const { history } = this.props;
    const { title, level, sections } = this.state;
    if (title !== "" || level !== levelType.BASIC || sections.length !== 0) {
      const back = confirm("Leave the page? Changes you made will be deleted.");
      if (back) {
        history.goBack();
      }
    }
  };

  onClickCreateConfirm = () => {
    const { title, level, sections } = this.state;
    const { selectedUser } = this.props;
    const roadmapData = {
      authorId: selectedUser.id,
      title,
      level,
      sections,
    };
    this.onCreateRoadmap(roadmapData);
  };

  render() {
    const { sections, level, title } = this.state;

    const CreateSections = sections.map((section, index) => {
      return (
        <CreateSection
          tmpSectionId={index}
          sectionLastId={sections.length - 1}
          title={section.title}
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
      <div className="CreateRoadmap">
        <h1>Create Roadmap</h1>
        <div className="roadmap">
          <label>Title</label>
          <input
            id="roadmap-title"
            type="text"
            value={title}
            onChange={(event) => this.onChangeTitle(event.target.value)}
          />
          <select
            id="roadmap-level"
            value={level}
            onChange={(event) => this.onChangeLevel(event.target.value)}
          >
            Level
            <option value={levelType.BASIC}>Basic</option>
            <option value={levelType.INTERMEDIATE}>Intermediate</option>
            <option value={levelType.ADVANCED}>Advanced</option>
          </select>
          <div className="Section">
            {CreateSections}
            <button
              type="button"
              id="create-section-button"
              onClick={() => {
                this.onClickCreateSection();
              }}
            >
              Create Section
            </button>
          </div>
          <div className="Back-Confirm">
            <button
              id="back-create-roadmap-button"
              type="button"
              onClick={() => this.onClickCreateBack()}
            >
              Back
            </button>
            <button
              id="confirm-create-roadmap-button"
              type="button"
              onClick={() => this.onClickCreateConfirm()}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  }
}

CreateRoadmap.propTypes = {
  selectedUser: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateRoadmap: (roadmapData) =>
      dispatch(actionCreators.createRoadmap(roadmapData)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(CreateRoadmap));
