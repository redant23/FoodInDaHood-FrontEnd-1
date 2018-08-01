import React, { Component } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import "./Footer.css";
import navMain from "./Images/nav-main.png";
import navFind from "./Images/nav-find.png";
import navMy from "./Images/nav-my.png";
import navMainAct from "./Images/nav-main-act.png";
import navFindAct from "./Images/nav-find-act.png";
import navMyAct from "./Images/nav-my-act.png";

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
    var mainImageActive = navMain;
    var findImageActive = navFind;
    var myImageActive = navMy;
    if (this.props.footerNavTapStatus.mainTap) {
      mainImageActive = navMainAct;
    } else if (this.props.footerNavTapStatus.searchTap) {
      findImageActive = navFindAct;
    } else if (this.props.footerNavTapStatus.myListTap) {
      myImageActive = navMyAct;
    }

    return (
      <footer className="main-footer">
        <nav className="footer-nav">
          <Link
            to="/"
            className={`main-tap ${classNames({
              highlight: this.props.footerNavTapStatus.mainTap
            })}`}
            onClick={this.handleClick.bind(this)}
          >
            <div className="nav-items"><img className="nav-main" src={mainImageActive} /><span>메인</span></div>
          </Link>
          <Link
            to="/search"
            className={`search-tap ${classNames({
              highlight: this.props.footerNavTapStatus.searchTap
            })}`}
            onClick={this.handleClick.bind(this)}
          >
            <div className="nav-items"><img className="nav-find" src={findImageActive} /><span>검색</span></div>
          </Link>
          <Link
            to="/mylist"
            className={`my-list ${classNames({
              highlight: this.props.footerNavTapStatus.myListTap
            })}`}
            onClick={this.handleClick.bind(this)}
          >
            <div className="nav-items"><img className="nav-my" src={myImageActive} /><span>나의목록</span></div>
          </Link>
        </nav>
      </footer>
    );
  }
}

export default Footer;
