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
    this.props.updateSearchKeyWord(ev.target.value);
  }

  handleChange(ev) {
    let keyWord = ev.target.value.trim();

    this.props.onChangeInput(keyWord);
  }

  render() {
    return (
      <div className="search-bar">
        <input
          value={this.props.searchKeyWord}
          className="search-bar-input"
          onChange={this.handleChangeWithPersist.bind(this)}
          type="text"
          placeholder="지역, 카테고리, 푸드트럭명으로 검색"
        />
      </div>
    );
  }
}

export default SearchBar;
