/* Search Result page.
 * All search actions redirects to this page.
 * On this page, the user can try "advanced search".
 */

import React, { Component } from "react";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";
import { sortType } from "../../constants";

// import * as actionCreators from "../../store/actions/index";
// import "./SearchResult.scss";

class SearchResult extends Component {
  state = {
    advancedSearchInput: "",
    sortBy: sortType.LIKE,
    level: [{ basic: true, intermediate: true, advanced: true }],
    basicChecked: true,
    intermediateChecked: true,
    advancedChecked: true,
    tags: [],
    newTag: "",
  };

  onChangeSortBy = (sorttype) => {
    this.setState({ sortBy: parseInt(sorttype, 10) });
  };

  // onClickAdvancedSearch = (title, tags, level, sort) => {};

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

  render() {
    const {
      advancedSearchInput,
      sortBy,
      basicChecked,
      intermediateChecked,
      advancedChecked,
      level,
      tags,
      newTag,
    } = this.state;

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
    return (
      <div className="SearchResult">
        <h1>Search Result</h1>

        <label>Level: </label>
        <input type="checkbox" checked={basicChecked} onChange={this.onClickBasic} />
        <label>Basic</label>
        <input type="checkbox" checked={intermediateChecked} onChange={this.onClickIntermediate} />
        <label>Intermediate</label>
        <input type="checkbox" checked={advancedChecked} onChange={this.onClickAdvanced} />
        <label>Advanced</label>

        <br />

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

        <br />

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
    );
  }
}

// SearchResult.propTypes = {
//   onSignUp: PropTypes.func.isRequired,
//   isSignedIn: PropTypes.bool,
//   history: PropTypes.objectOf(PropTypes.any),
// };

// const mapStateToProps = (state) => {
//   return {
//     isSignedIn: state.user.isSignedIn,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onSignUp: (userCredentials) => dispatch(actionCreators.signUp(userCredentials)),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);

export default SearchResult;
