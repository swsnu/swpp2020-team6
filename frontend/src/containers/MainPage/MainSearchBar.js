import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import * as actionCreators from "../../store/actions/index";

import "./MainSearchBar.scss";

class MainSearchBar extends Component {
  state = {
    mainSearchInput: "",
  };

  onClickSearch = (title) => {
    const { onGetSimpleSearch } = this.props;
    onGetSimpleSearch({ title });
  };

  render() {
    const { mainSearchInput } = this.state;

    return (
      <div className="MainSearchBar">
        <h3>Learn and Share your knowledge</h3>
        <div id="input-base">
          <input
            id="search-input"
            type="text"
            placeholder="Search for Roadmaps of your interest!"
            value={mainSearchInput}
            onChange={(event) => this.setState({ mainSearchInput: event.target.value })}
          />
          <IconButton
            id="search-button"
            aria-label="search-button"
            disabled={mainSearchInput === ""}
            color="primary"
            onClick={() => this.onClickSearch(mainSearchInput)}
          >
            <SearchIcon />
          </IconButton>
        </div>
      </div>
    );
  }
}

MainSearchBar.propTypes = {
  onGetSimpleSearch: PropTypes.func.isRequired,
};
const mapDispatchToProps = (dispatch) => {
  return {
    onGetSimpleSearch: (searchData) => dispatch(actionCreators.getSimpleSearch(searchData)),
  };
};
export default connect(null, mapDispatchToProps)(MainSearchBar);
