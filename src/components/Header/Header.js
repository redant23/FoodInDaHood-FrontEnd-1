import React, { Component } from "react";
import "./Header.css";

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
          <h1 className="main-title">우리동네 푸드트럭</h1>
        </nav>
      </header>
    );
  }
}

export default Header;
