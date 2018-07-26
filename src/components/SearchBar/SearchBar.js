import React, { Component } from "react";
import _ from "lodash";
import "./SearchBar.css";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.handleChange = _.debounce(this.handleChange.bind(this), 500);
  }

  handleChangeWithPersist(ev) {
    ev.persist();
    this.handleChange(ev);
  }

  handleChange(ev) {
    let keyWord = ev.target.value.trim();

    this.props.onChangeInput(keyWord);
  }

  render() {
    return (
      <div className="search-bar">
        <input
          className="search-bar-input"
          onChange={this.handleChangeWithPersist.bind(this)}
          type="text"
          autoFocus
        />
      </div>
    );
  }
}

export default SearchBar;
