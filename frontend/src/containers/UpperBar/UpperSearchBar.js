import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as actionCreators from "../../store/actions/index";

class UpperSearchBar extends Component {
  state = {
    searchInput: "",
  };

  onClickSearch = (title) => {
    const { onGetSimpleSearch } = this.props;
    onGetSimpleSearch({ title });
  };

  render() {
    const { searchInput } = this.state;
    return (
      <div className="UpperSearchBar">
        <input
          id="search-input"
          type="text"
          placeholder="Roadmap to search..."
          value={searchInput}
          onChange={(event) => this.setState({ searchInput: event.target.value })}
        />
        <button
          type="button"
          id="search-button"
          onClick={() => this.onClickSearch(searchInput)}
          disabled={searchInput === ""}
        >
          Search
        </button>
      </div>
    );
  }
}

UpperSearchBar.propTypes = {
  onGetSimpleSearch: PropTypes.func.isRequired,
};
const mapDispatchToProps = (dispatch) => {
  return {
    onGetSimpleSearch: (searchData) => dispatch(actionCreators.getSimpleSearch(searchData)),
  };
};
export default connect(null, mapDispatchToProps)(UpperSearchBar);
