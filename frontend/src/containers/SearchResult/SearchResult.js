/* Search Result page.
 * All search actions redirects to this page.
 * On this page, the user can try "advanced search".
 */

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { sortType } from "../../constants";
import * as actionCreators from "../../store/actions/index";
import SimpleRoadmap from "../../components/SimpleRoadmap/SimpleRoadmap";

import "./SearchResult.scss";

class SearchResult extends Component {
  state = {
    advancedSearchInput: "",
    sortBy: sortType.LIKE,
    basicChecked: true,
    intermediateChecked: true,
    advancedChecked: true,
    tags: [],
    newTag: "",
    page: 1,
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
    this.setState({ page: 1 });
  };

  onClickBasic = (event) => {
    this.setState({ basicChecked: event.target.checked });
  };

  onClickIntermediate = (event) => {
    this.setState({ intermediateChecked: event.target.checked });
  };

  onClickAdvanced = (event) => {
    this.setState({ advancedChecked: event.target.checked });
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

  onClickAddFromTopTag = (topTag) => {
    const { tags } = this.state;
    let tagExists = false;
    tags.forEach((tag) => {
      if (tag === topTag) tagExists = true;
    });
    if (!tagExists) {
      this.setState({ tags: tags.concat(topTag) });
    }
  };

  calcLevelData = (basic, intermediate, advanced) => {
    let levelData = [];
    if (basic) {
      levelData = levelData.concat("1");
    }
    if (intermediate) {
      levelData = levelData.concat("2");
    }
    if (advanced) {
      levelData = levelData.concat("3");
    }
    if (!basic && !intermediate && !advanced) {
      levelData = ["1", "2", "3"];
    }
    return levelData;
  };

  onClickPageNumber = (pageNumber) => {
    const { onGetAdvancedSearch } = this.props;
    const {
      advancedSearchInput,
      tags,
      basicChecked,
      intermediateChecked,
      advancedChecked,
      sortBy,
    } = this.state;

    this.setState({ page: pageNumber });

    onGetAdvancedSearch({
      title: advancedSearchInput,
      tags,
      levels: this.calcLevelData(basicChecked, intermediateChecked, advancedChecked),
      sort: sortBy,
      page: pageNumber,
      perpage: 9,
    });

    this.setState({ page: pageNumber });
  };

  render() {
    const {
      advancedSearchInput,
      sortBy,
      basicChecked,
      intermediateChecked,
      advancedChecked,
      tags,
      newTag,
      page,
    } = this.state;

    const { searchResult, topTags, totalCount, history } = this.props;

    const searchResultList = searchResult.map((simpleObject) => {
      return (
        <SimpleRoadmap
          roadmapTitle={simpleObject.title}
          roadmapImageId={simpleObject.image_id}
          roadmapLevel={simpleObject.level}
          authorId={simpleObject.author_id}
          authorName={simpleObject.author_name}
          likeCount={simpleObject.like_count}
          pinCount={simpleObject.pin_count}
          commentCount={simpleObject.comment_count}
          roadmapDescription={simpleObject.description}
          isMyPage={false}
          tagList={simpleObject.tags}
          date={simpleObject.date}
          onClick={() => history.push(`/roadmap/${simpleObject.id}`)}
        />
      );
    });

    const tagList = tags.map((tag, index) => {
      return (
        <div className="tags">
          <div className="tag-name" key={tag}>
            {tag}
          </div>
          <button
            className="delete-tag-button"
            type="button"
            onClick={() => this.onClickDeleteTag(index)}
          >
            x
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
            key={tag}
            onClick={() => this.onClickAddFromTopTag(tag)}
          >
            {tag}
          </button>
        </div>
      );
    });

    // Create page buttons.
    let pageCount;
    if (totalCount % 9 === 0) {
      pageCount = totalCount / 9;
    } else {
      pageCount = parseInt(totalCount / 9, 10) + 1;
    }
    let pageList = [];
    for (let i = 1; i <= pageCount; i += 1) {
      pageList = pageList.concat(
        <button id={`page${i}`} onClick={() => this.onClickPageNumber(i)} type="button">
          {i}
        </button>,
      );
    }

    return (
      <div className="SearchResult">
        <div className="empty-column" />
        <div className="left-column">
          <div className="level">
            <h4>Level</h4>
            <div className="basic">
              <input
                type="checkbox"
                id="basic"
                checked={basicChecked}
                onChange={this.onClickBasic}
              />
              <label>Basic</label>
            </div>
            <div className="intermediate">
              <input
                type="checkbox"
                id="intermediate"
                checked={intermediateChecked}
                onChange={this.onClickIntermediate}
              />
              <label> Intermediate</label>
            </div>
            <div className="advanced">
              <input
                type="checkbox"
                id="advanced"
                checked={advancedChecked}
                onChange={this.onClickAdvanced}
              />
              <label>Advanced</label>
            </div>
          </div>

          <br />

          <div className="add-tags">
            <div className="add-a-tag">
              <input
                id="new-tag"
                value={newTag}
                onChange={(event) => this.onSetNewTag(event.target.value)}
                placeholder="Add tags to search"
              />
              <button id="add-tag-button" type="button" onClick={() => this.onClickAddTag()}>
                +
              </button>
            </div>
          </div>

          <div className="taglist">{tagList}</div>

          <br />

          <div className="topTagsBlock">
            <p>Search by top trending tags!</p>
            <div className="topTagList">{topTagList}</div>
          </div>

          <br />
        </div>

        <div className="right-column">
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
                    levels: this.calcLevelData(basicChecked, intermediateChecked, advancedChecked),
                    sort: sortBy,
                    page: 1,
                    perpage: 9,
                  })
                // eslint-disable-next-line react/jsx-curly-newline
              }
              type="button"
            >
              Search
            </button>
          </div>

          <br />

          <div className="search-result-list">{searchResultList}</div>

          <br />

          <div className="pages">
            {pageList}
            <br />
            Page
            {page}
          </div>
        </div>
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
  totalCount: PropTypes.number,
};

const mapStateToProps = (state) => {
  return {
    searchResult: state.search.searchResult,
    topTags: state.search.topTags,
    totalCount: state.search.totalCount,
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
