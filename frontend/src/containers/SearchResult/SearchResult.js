/* Search Result page.
 * All search actions redirects to this page.
 * On this page, the user can try "advanced search".
 */

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { sortType } from "../../constants";
import * as actionCreators from "../../store/actions/index";
import RoadmapSimple from "../../components/RoadmapSimple/RoadmapSimple";

// import "./SearchResult.scss";

class SearchResult extends Component {
  state = {
    simpleSearchInput: "",
    advancedSearchInput: "",
    sortBy: sortType.LIKE,
    level: [{ basic: true, intermediate: true, advanced: true }],
    basicChecked: true,
    intermediateChecked: true,
    advancedChecked: true,
    tags: [],
    newTag: "",
  };

  componentDidMount() {
    const { onGetTopTags } = this.props;
    onGetTopTags(10);
  }

  onClickSimpleSearch = (searchWord) => {
    const { onGetSimpleSearch } = this.props;
    onGetSimpleSearch({ title: searchWord });
  };

  onClickAdvancedSearch = (searchData) => {
    const { onGetAdvancedSearch } = this.props;
    onGetAdvancedSearch(searchData);
  };

  onClickBasic = (event) => {
    const { level } = this.state;
    this.setState({ basicChecked: event.target.checked });
    this.setState({ level: { ...level, basic: event.target.checked } });
  };

  onClickIntermediate = (event) => {
    const { level } = this.state;
    this.setState({ intermediateChecked: event.target.checked });
    this.setState({ level: { ...level, intermediate: event.target.checked } });
  };

  onClickAdvanced = (event) => {
    const { level } = this.state;
    this.setState({ advancedChecked: event.target.checked });
    this.setState({ level: { ...level, advanced: event.target.checked } });
  };

  onChangeSortBy = (sorttype) => {
    this.setState({ sortBy: parseInt(sorttype, 10) });
  };

  onSetNewTag = (newTag) => {
    this.setState({ newTag });
  };

  onClickAddTag = () => {
    const { tags, newTag } = this.state;
    this.setState({ tags: tags.concat(newTag) });
    this.setState({ newTag: "" });
  };

  onClickDeleteTag = (id) => {
    const { tags } = this.state;
    this.setState({ tags: tags.filter((_, index) => index !== id) });
  };

  onClickAddFromTopTag = (tag) => {
    const { tags } = this.state;
    this.setState({ tags: tags.concat(tag) });
  };

  onClickTitle = (roadmapID) => {
    const { history } = this.props;
    history.push(`/roadmap/${roadmapID}`);
  };

  render() {
    const {
      simpleSearchInput,
      advancedSearchInput,
      sortBy,
      basicChecked,
      intermediateChecked,
      advancedChecked,
      level,
      tags,
      newTag,
    } = this.state;

    const { searchResult, topTags } = this.props;

    const searchResultList = searchResult.map((simpleObject) => {
      return (
        <RoadmapSimple
          roadmapID={simpleObject.id}
          title={simpleObject.title}
          date={simpleObject.date}
          level={simpleObject.level}
          likeCount={simpleObject.like_count}
          commentCount={simpleObject.comment_count}
          pinCount={simpleObject.pin_count}
          progress={simpleObject.progress}
          authorID={simpleObject.author_id}
          authorName={simpleObject.author_name}
          authorPictureUrl={simpleObject.author_picture_url}
          tags={simpleObject.tags}
          onClickTitleHandler={this.onClickTitle}
        />
      );
    });

    const tagList = tags.map((tag, index) => {
      return (
        <div className="tags">
          <p key={tag}>{tag}</p>
          <button
            className="delete-tag-button"
            type="button"
            onClick={() => this.onClickDeleteTag(index)}
          >
            delete
          </button>
        </div>
      );
    });

    const topTagList = topTags.map((tag) => {
      return (
        <div className="topTags">
          <button
            className="add-top-tag-button"
            type="button"
            key={tag.tag_content}
            onClick={() => this.onClickAddFromTopTag(tag.tag_content)}
          >
            {tag.tag_content}
          </button>
        </div>
      );
    });

    return (
      <div className="SearchResult">
        <h1>Search Result</h1>

        <div className="level">
          <label>Level: </label>
          <input type="checkbox" checked={basicChecked} onChange={this.onClickBasic} />
          <label>Basic</label>
          <input
            type="checkbox"
            checked={intermediateChecked}
            onChange={this.onClickIntermediate}
          />
          <label>Intermediate</label>
          <input type="checkbox" checked={advancedChecked} onChange={this.onClickAdvanced} />
          <label>Advanced</label>
        </div>

        <div className="advanced-search-bar">
          <select
            id="sortBy"
            value={sortBy}
            onChange={(event) => {
              return this.onChangeSortBy(event.target.value);
            }}
          >
            <option value={sortType.LIKE}>Sort by: Like</option>
            <option value={sortType.PIN}>Sort by: Pin</option>
            <option value={sortType.NEW}>Sort by: New</option>
          </select>
          <input
            id="advanced-search-input"
            value={advancedSearchInput}
            placeholder="Roadmap to search..."
            onChange={(event) => this.setState({ advancedSearchInput: event.target.value })}
          />
          <button
            id="advanced-search-button"
            onClick={
              () =>
                this.onClickAdvancedSearch({
                  title: advancedSearchInput,
                  tags,
                  level,
                  sort: sortBy,
                })
              // eslint-disable-next-line react/jsx-curly-newline
            }
            type="button"
          >
            Search
          </button>
        </div>

        <div className="tags">
          <label>Tags</label>
          {tagList}
          <input
            id="new-tag"
            value={newTag}
            onChange={(event) => this.onSetNewTag(event.target.value)}
          />
          <button id="add-tag-button" type="button" onClick={() => this.onClickAddTag()}>
            add
          </button>
        </div>

        <div clasName="topTags">
          <label>Top Tags</label>
          {topTagList}
        </div>

        <div className="simple-search">
          <input
            id="simple-search-input"
            value={simpleSearchInput}
            placeholder="Simple search testing..."
            onChange={(event) => this.setState({ simpleSearchInput: event.target.value })}
          />
          <button
            id="simple-search-button"
            onClick={() => this.onClickSimpleSearch(simpleSearchInput)}
            type="button"
          >
            Simple Search Test
          </button>
        </div>

        <div className="search-result-list">{searchResultList}</div>
      </div>
    );
  }
}

SearchResult.propTypes = {
  onGetSimpleSearch: PropTypes.func,
  onGetAdvancedSearch: PropTypes.func,
  onGetTopTags: PropTypes.func,
  searchResult: PropTypes.objectOf(PropTypes.any),
  topTags: PropTypes.objectOf(PropTypes.any),
  history: PropTypes.objectOf(PropTypes.any),
};

const mapStateToProps = (state) => {
  return {
    searchResult: state.search.searchResult,
    topTags: state.search.topTags,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetSimpleSearch: (searchData) => dispatch(actionCreators.getSimpleSearch(searchData)),
    onGetAdvancedSearch: (searchData) => dispatch(actionCreators.getAdvancedSearch(searchData)),
    onGetTopTags: (tagCount) => dispatch(actionCreators.getTopTags(tagCount)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
