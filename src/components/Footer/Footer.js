import React, { Component } from "react";
import classNames from "classnames";
import "./Footer.css";

class Footer extends Component {
  handleClick(ev) {
    let classList = ev.currentTarget.classList;

    if (classList.contains("main-tap")) {
      this.props.updateFooterNavTapStatus(classList[0]);
    } else if (classList.contains("search-tap")) {
      this.props.updateFooterNavTapStatus(classList[0]);
    } else if (classList.contains("my-list")) {
      this.props.updateFooterNavTapStatus(classList[0]);
    } else if (classList.contains("extra")) {
      this.props.updateFooterNavTapStatus(classList[0]);
    }
  }

  render() {
    return (
      <footer className="main-footer">
        <nav className="footer-nav">
          <div
            className={`main-tap ${classNames({
              highlight: this.props.footerNavTapStatus.mainTap
            })}`}
            onClick={this.handleClick.bind(this)}
          >
            <span>메인</span>
          </div>
          <div
            className={`search-tap ${classNames({
              highlight: this.props.footerNavTapStatus.searchTap
            })}`}
            onClick={this.handleClick.bind(this)}
          >
            <span>검색</span>
          </div>
          <div
            className={`my-list ${classNames({
              highlight: this.props.footerNavTapStatus.myListTap
            })}`}
            onClick={this.handleClick.bind(this)}
          >
            <span>나의목록</span>
          </div>
          <div
            className={`extra ${classNames({
              highlight: this.props.footerNavTapStatus.extraTap
            })}`}
            onClick={this.handleClick.bind(this)}
          >
            <span>기타</span>
          </div>
        </nav>
      </footer>
    );
  }
}

export default Footer;
