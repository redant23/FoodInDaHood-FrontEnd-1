import React, { Component } from "react";
import "./Header.css";
import logotype from "./Images/logotype.png";

class Header extends Component {
  render() {
    return (
      <header className="main-header">
        <nav className="main-nav">
          <img className="main-title-img" src={logotype} alt="no-img" />
        </nav>
      </header>
    );
  }
}

export default Header;
