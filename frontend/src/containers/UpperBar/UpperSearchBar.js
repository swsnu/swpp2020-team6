import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as actionCreators from "../../store/actions/index";

class UpperSearchBar extends Component {
  state = {
    searchInput: "",
  };

  onClickSearch = (searchData) => {
    const { onGetSimpleSearch } = this.props;
    onGetSimpleSearch({ title: searchData });
  };

  render() {
    const { searchInput } = this.state;
    return (
      <div className="UpperSearchBar">
        <input
          id="search-input"
          type="text"
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
  onGetSimpleSearch: PropTypes.func,
};
const mapDispatchToProps = (dispatch) => {
  return {
    onGetSimpleSearch: (searchData) => dispatch(actionCreators.getSimpleSearch(searchData)),
  };
};
export default connect(null, mapDispatchToProps)(UpperSearchBar);
