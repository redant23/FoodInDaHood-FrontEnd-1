import React, { Component } from "react";
import "./Header.css";

class Header extends Component {
  render() {
    return (
      <header className="main-header">
        <nav className="main-nav">
          <h1>우리동네 푸드트럭</h1>
        </nav>
      </header>
    );
  }
}

export default Header;
