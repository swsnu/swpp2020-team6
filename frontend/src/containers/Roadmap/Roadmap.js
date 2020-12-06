/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React, { Component } from "react";
import PropTypes from "prop-types";
import Switch from "@material-ui/core/Switch";

import CreateSection from "../../components/CreateSection/CreateSection";
import StyledSelect from "../../components/Roadmap/StyledComponents/StyledSelect";
import { levelType, roadmapImageNum } from "../../constants";
import "./Roadmap.scss";

class Roadmap extends Component {
  state = {
    received: false,
    isPrivate: false,
    imageId: 1,
    title: "",
    level: 0,
    description: "",
    sections: [],
    tags: [],
    addedTagList: [],
    deletedTagList: [],
    newTag: "",
  };

  setInitialState = () => {
    const { selectedRoadmap } = this.props;
    this.setState({
      received: true,
      isPrivate: selectedRoadmap.private,
      imageId: selectedRoadmap.image_id,
      title: selectedRoadmap.title,
      level: parseInt(selectedRoadmap.level, 10),
      description: selectedRoadmap.description,
      sections: selectedRoadmap.sections.map((section) => {
        return { ...section, collapse: false };
      }),
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

  onChangeImageId = (imageId) => {
    this.setState({ imageId: parseInt(imageId, 10) });
  };

  onChangeDescription = (description) => {
    this.setState({ description });
  };

  onChangeNewTag = (newTag) => {
    this.setState({ newTag });
  };

  onClickAddTag = () => {
    const { isEdit } = this.props;
    const { tags, newTag, addedTagList } = this.state;
    this.setState({ tags: tags.concat(newTag) });
    if (isEdit) this.setState({ addedTagList: addedTagList.concat(newTag) });
    this.setState({ newTag: "" });
  };

  onClickDeleteTag = (tag, id) => {
    const { isEdit } = this.props;
    const { tags, deletedTagList } = this.state;
    this.setState({ tags: tags.filter((_, index) => index !== id) });
    if (isEdit) this.setState({ deletedTagList: deletedTagList.concat(tag) });
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

  onClickSectionCollapse = (tmpSectionId) => {
    const { sections } = this.state;
    this.setState({
      sections: sections.map((section, index) => {
        if (index === tmpSectionId) {
          section.collapse = !section.collapse;
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

  onClickBack = () => {
    const { isEdit, onClickBackHandler } = this.props;
    if (isEdit) {
      const back = window.confirm("Leave the page? Changes you made will be deleted.");
      if (back) {
        onClickBackHandler();
      }
    } else {
      const { title, level, description, sections } = this.state;
      if (title !== "" || level !== 0 || sections.length !== 0 || description !== "") {
        const back = window.confirm("Leave the page? Changes you made will be deleted.");
        if (back) {
          onClickBackHandler();
        }
      } else onClickBackHandler();
    }
  };

  onClickConfirm = () => {
    const {
      isPrivate,
      imageId,
      title,
      level,
      description,
      sections,
      tags,
      addedTagList,
      deletedTagList,
    } = this.state;
    const roadmapData = {
      private: isPrivate,
      imageId,
      title,
      level,
      description,
      sections,
      tags,
      addedTagList,
      deletedTagList,
    };
    return roadmapData;
  };

  render() {
    const { isEdit, onClickConfirmHandler } = this.props;
    const {
      received,
      isPrivate,
      imageId,
      title,
      sections,
      level,
      description,
      tags,
      newTag,
    } = this.state;

    if (isEdit && received === false) {
      this.setInitialState();
    }
    const taglist = tags.map((tag, index) => {
      return (
        <div className="tag">
          <div className="tag-name" key={tag}>
            {tag}
          </div>
          <button
            className="delete-tag"
            type="button"
            onClick={() => this.onClickDeleteTag(tag, index)}
          >
            x
          </button>
        </div>
      );
    });

    let imageList = [{ name: <em style={{ color: "#aaaaaa" }}>Choose image</em>, value: 0 }];
    for (let i = 1; i <= roadmapImageNum; i += 1) {
      imageList = imageList.concat({
        name: (
          <img
            className="roadmap-image"
            src={require(`misc/roadmap/${i}.png`)}
            width="150"
            height="150"
            alt={`roadmap-${i}`}
          />
        ),
        value: i,
      });
    }

    const Sections = sections.map((section, index) => {
      return (
        <CreateSection
          tmpSectionId={index}
          sectionLastId={sections.length - 1}
          title={section.section_title}
          tasks={section.tasks}
          collapse={section.collapse}
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
          clickSectionCollapse={this.onClickSectionCollapse}
        />
      );
    });

    return (
      <div className="Roadmap">
        <div className="main">
          <h1>{isEdit ? "Edit Roadmap" : "Create Roadmap"}</h1>
          <div className="roadmap">
            <div className="title">
              <input
                id="roadmap-title"
                type="text"
                value={title}
                placeholder="Title"
                onChange={(event) => this.onChangeTitle(event.target.value)}
              />
            </div>
            <div className="info">
              <div className="private-level-tag">
                <div className="private-level">
                  <div className="roadmap-level-select">
                    <StyledSelect
                      value={level}
                      onChange={(event) => this.onChangeLevel(event.target.value)}
                      items={[
                        { name: <em style={{ color: "#aaaaaa" }}>Choose level</em>, value: 0 },
                        { name: "Basic", value: levelType.BASIC },
                        { name: "Intermediate", value: levelType.INTERMEDIATE },
                        { name: "Advanced", value: levelType.ADVANCED },
                      ]}
                      customId="roadmap-level"
                      label="Level"
                    />
                  </div>
                  <label id="roadmap-private-label">{isPrivate ? "Private" : "Public"}</label>
                  <Switch
                    id="roadmap-private"
                    checked={isPrivate}
                    onClick={() => this.onClickPrivate()}
                  />
                </div>
                <div className="tag-block">
                  <div className="new-tag">
                    <input
                      id="new-tag"
                      value={newTag}
                      placeholder="Add tags"
                      onChange={(event) => this.onChangeNewTag(event.target.value)}
                    />
                    <button id="add-tag-button" type="button" onClick={() => this.onClickAddTag()}>
                      +
                    </button>
                  </div>
                  <div className="tags">{taglist}</div>
                </div>
              </div>
              <div className="roadmap-image-select">
                <StyledSelect
                  value={imageId}
                  onChange={(event) => this.onChangeImageId(event.target.value)}
                  items={imageList}
                  customId="roadmap-image"
                  label="Image"
                />
              </div>
            </div>
            <input
              id="roadmap-description"
              value={description}
              placeholder="Description"
              onChange={(event) => this.onChangeDescription(event.target.value)}
            />
          </div>
          {Sections}
          <button
            type="button"
            id="create-section-button"
            onClick={() => this.onClickCreateSection()}
          >
            Create Section
          </button>
        </div>
        <button id="back-roadmap-button" type="button" onClick={() => this.onClickBack()}>
          Back
        </button>
        <button
          id="confirm-roadmap-button"
          type="button"
          disabled={title === "" || level === 0 || sections.length === 0}
          onClick={() => onClickConfirmHandler(this.onClickConfirm())}
        >
          Confirm
        </button>
      </div>
    );
  }
}

Roadmap.propTypes = {
  selectedRoadmap: PropTypes.objectOf(PropTypes.any),
  isEdit: PropTypes.bool.isRequired,
  onClickBackHandler: PropTypes.func,
  onClickConfirmHandler: PropTypes.func,
};

export default Roadmap;
