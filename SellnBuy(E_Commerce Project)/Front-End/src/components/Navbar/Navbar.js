import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import ConditinalRender from "./ConditionalRender";
// import logoSrc from "../../assets/log.png";
import logoSrc from "../../assets/ecomLogo.png";
import "./Navbar.css";
import SearchBar from "./SearchBar";

class Navbar extends Component {
  state = {
    isLoggedIn: false,
  };

  componentDidMount() {
    let token = localStorage.getItem("token");
    let role = localStorage.getItem("role");
    if (token !== null && role === "buyer") {
      this.setState({ isLoggedIn: true });
    } else {
      // console.log("token doesn't exist!");
    }
  }

  render() {
    let navStyle = null;
    if (this.props.shadow) {
      navStyle = {
        boxShadow: "rgb(146 146 185 / 63%) 0px 3px 9px"
      };
    }

    return (
      <div
        className="Navbar navbar navbar-expand-lg navbar-light bg-light"
        style={navStyle}
      >
        <div className="navbar-brand">
          <NavLink to="/">
            <img src={logoSrc} alt='logo'/>
            {/* <h2>SellnBuy</h2> */}
          </NavLink>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="NavLink navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink
                to="/category/Men"
              >
                <h4>MEN</h4>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/category/Women"
              >
                <h4>WOMEN</h4>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/category/Kids"
              >
                <h4>KIDS</h4>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/category/Home_&_Living"
              >
                <h4>HOME & LIVING</h4>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/category/Travel_Bags"
              >
                <h4>TRAVEL BAGS</h4>
              </NavLink>
            </li>
          </ul>
          <div className="SearchContainer">
            {/* <SearchBar search={this.searchSubmit}/> */}
            <SearchBar />
          </div>
          <div className="conditional">
            <ConditinalRender isLoggedIn={this.state.isLoggedIn} />
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
