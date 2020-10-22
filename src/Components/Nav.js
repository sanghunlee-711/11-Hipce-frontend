import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import Search from "../Pages/Search/Search";
import "./Nav.scss";

class Nav extends Component {
  state = {
    isModalActive: false,
    navInMain: true,
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleNav);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleNav);
  }

  handleNav = () => {
    const { pathname } = this.props.history.location;
    const { scrollY } = window;

    if (pathname === "/" || pathname === "/main") {
      this.setState({
        navInMain: true,
      });

      if (scrollY < 969) {
        this.setState({
          navInMain: true,
        });
      }

      if (scrollY >= 969 && scrollY < 2907) {
        this.setState({
          navInMain: false,
          navReduced: false,
        });
      }

      if (scrollY >= 4419) {
        this.setState({
          navInMain: false,
          navReduced: false,
        });
      }
    } else if (pathname !== "/" || pathname !== "/main") {
      this.setState({
        navInMain: false,
        navReduced: window.scrollY >= 100,
      });
    }
  };

  showModal = (e) => {
    this.setState({ isModalActive: true });
  };
  hideModal = () => {
    this.setState({ isModalActive: false });
  };

  render() {
    const { navReduced, navInMain } = this.state;
    return (
      <div
        className={navInMain ? "NavBright" : navReduced ? "NavReduced" : "Nav"}
      >
        <div className="siteLogo">
          <Link to="/" />
        </div>
        <div className="siteMenu">
          <ul>
            <li>
              <Link to="/about" className="hover hover-1">
                About
              </Link>
            </li>
            <li>
              <Link to="/collection" className="hover hover-1">
                Collection
              </Link>
            </li>
            <li>
              <Link to="/list/category=lip" className="hover hover-1">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/" className="hover hover-1">
                Store
              </Link>
            </li>
            <li>
              <Link to="/" className="hover hover-1">
                Service
              </Link>
            </li>
          </ul>
        </div>
        <div className="siteExtra">
          <ul>
            <Link to="/login">
              <li></li>
            </Link>
            <Link>
              <li onClick={this.showModal}> </li>
            </Link>
            <Link to="/shoppingbag">
              <li className="shoppingbag"></li>
            </Link>
          </ul>
          {this.state.isModalActive && <Search onClose={this.hideModal} />}
        </div>
      </div>
    );
  }
}

export default withRouter(Nav);
