import React, { Component } from "react";
import classNames from "classnames";
import "./FilterBox.css";

class FilterBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConsoleOpen: false
    };
  }

  handleClick() {
    let isConsoleOpen = !this.state.isConsoleOpen;
    this.setState({ isConsoleOpen });
  }

  handleClickForDistance(ev) {
    let classList = ev.target.classList;

    if (classList.contains("distance-100")) {
      this.props.onDistanceClick(100);
    } else if (classList.contains("distance-500")) {
      this.props.onDistanceClick(500);
    } else if (classList.contains("distance-1000")) {
      this.props.onDistanceClick(1000);
    } else if (classList.contains("distance-2000")) {
      this.props.onDistanceClick(2000);
    } else if (classList.contains("distance-4000")) {
      this.props.onDistanceClick(4000);
    }
  }

  handleClickForFilter(ev) {
    let classList = ev.target.classList;

    if (classList.contains("filter-by-distance")) {
      this.props.handleUpdateVendorListFilterStatus("distance");
    } else if (classList.contains("filter-by-favorite")) {
      this.props.handleUpdateVendorListFilterStatus("favorite");
    } else if (classList.contains("filter-by-comment")) {
      this.props.handleUpdateVendorListFilterStatus("comment");
    }
  }

  render() {
    return (
      <div className="filter-box">
        <div className="filter-box-btn-container">
          <button
            className="filter-box-btn"
            onClick={this.handleClick.bind(this)}
          >
            여기눌러봐
          </button>
        </div>
        <div
          className={`filter-console-box ${classNames({
            open: this.state.isConsoleOpen
          })}`}
        >
          <ul className="distance-selector">
            <li
              className={`filter-distance distance-100 ${classNames({
                activated: this.props.vendorListDistance === 100
              })}`}
              onClick={this.handleClickForDistance.bind(this)}
            >
              100 m
            </li>
            <li
              className={`filter-distance distance-500 ${classNames({
                activated: this.props.vendorListDistance === 500
              })}`}
              onClick={this.handleClickForDistance.bind(this)}
            >
              500 m
            </li>
            <li
              className={`filter-distance distance-1000 ${classNames({
                activated: this.props.vendorListDistance === 1000
              })}`}
              onClick={this.handleClickForDistance.bind(this)}
            >
              1 km
            </li>
            <li
              className={`filter-distance distance-2000 ${classNames({
                activated: this.props.vendorListDistance === 2000
              })}`}
              onClick={this.handleClickForDistance.bind(this)}
            >
              2 km
            </li>
            <li
              className={`filter-distance distance-4000 ${classNames({
                activated: this.props.vendorListDistance === 4000
              })}`}
              onClick={this.handleClickForDistance.bind(this)}
            >
              4 km
            </li>
          </ul>
          <ul className="filter-selector">
            <li
              className={`filter-type filter-by-distance ${classNames({
                activated: this.props.vendorListFilterStatus.isByDistance
              })}`}
              onClick={this.handleClickForFilter.bind(this)}
            >
              거리순
            </li>
            <li
              className={`filter-type filter-by-favorite ${classNames({
                activated: this.props.vendorListFilterStatus.isByFavorite
              })}`}
              onClick={this.handleClickForFilter.bind(this)}
            >
              즐겨찾기순
            </li>
            <li
              className={`filter-type filter-by-comment ${classNames({
                activated: this.props.vendorListFilterStatus.isByComment
              })}`}
              onClick={this.handleClickForFilter.bind(this)}
            >
              댓글순
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default FilterBox;
