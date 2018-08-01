import React, { Component } from "react";
import "./Header.css";
import logotype from './Images/logotype.png';

class Header extends Component {
  handleClick() {
    this.props.getBackBtnClick();
  }

  render() {
    return (
      <header className="main-header">
        <nav className="main-nav">
          {this.props.getBackBtn &&
            this.props.getBackBtnClick && (
              <button
                className="get-back-btn"
                onClick={this.handleClick.bind(this)}
              >
                뒤로
              </button>
            )}
          <img className="main-title-img" src={logotype} />
        </nav>
      </header>
    );
  }
}

export default Header;
