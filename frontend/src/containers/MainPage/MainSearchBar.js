import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { perPage } from "../../constants";

import "./MainSearchBar.scss";

class MainSearchBar extends Component {
  state = {
    mainSearchInput: "",
  };

  onClickSearch = (title) => {
    /* title & tags & levels & sort & page & perpage */
    /* tags: tag1 tag2 tag3 */
    /* levels: basic, intermediate, advanced -> 111 */
    window.location.replace(`/search/?${title}&&111&1&1&${perPage}`);
  };

  render() {
    const { mainSearchInput } = this.state;

    return (
      <div className="MainSearchBar">
        <h3>Learn and Share Your Knowledge</h3>
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

export default MainSearchBar;
