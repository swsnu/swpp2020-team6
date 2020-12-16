import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { perPage } from "../../constants";

import "./UpperSearchBar.scss";

class UpperSearchBar extends Component {
  state = {
    searchInput: "",
  };

  onClickSearch = (title) => {
    /* title & tags & levels & sort & page & perpage */
    /* tags: tag1 tag2 tag3 */
    /* levels: basic, intermediate, advanced -> 111 */
    window.location.replace(`/search/?${encodeURI(title)}&&111&1&1&${perPage}`);
  };

  render() {
    const { searchInput } = this.state;

    return (
      <div className="UpperSearchBar">
        <div id="input-base">
          <input
            id="search-input"
            type="text"
            placeholder="Search for Roadmaps by title"
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

export default UpperSearchBar;
