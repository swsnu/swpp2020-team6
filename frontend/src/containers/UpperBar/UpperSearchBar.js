import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import * as actionCreators from "../../store/actions/index";

import "./UpperSearchBar.scss";

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
        <div id="input-base">
          <input
            id="search-input"
            type="text"
            placeholder="Search Roadmap by title"
            value={searchInput}
            onChange={(event) => this.setState({ searchInput: event.target.value })}
          />
          <IconButton
            id="search-button"
            aria-label="search-button"
            disabled={searchInput === ""}
            color="primary"
            onClick={() => this.onClickSearch(searchInput)}
          >
            <SearchIcon />
          </IconButton>
        </div>
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
