import React from "react";
import { NavLink } from "react-router-dom";
import "./css/NavLinks.css";

const NavLinks = (props) => {

  return (
    <React.Fragment>
      <ul className="nav-links">
        <React.Fragment>
          <div className="left">
            <li className="left-link">
              <NavLink activeClassName="nav-link-selected" to={`/`} exact>
                Home
              </NavLink>
            </li>
            <li className="left-link">
              <NavLink activeClassName="nav-link-selected" to={`/about`} exact>
                About Us
              </NavLink>
            </li>
            <li className="left-link">
              <NavLink
                activeClassName="nav-link-selected"
                to={`/contact`}
                exact
              >
                Contact Us
              </NavLink>
            </li>
            <li className="left-link">
              <NavLink
                activeClassName="nav-link-selected"
                to={`/reviews`}
                exact
              >
                Reviews
              </NavLink>
            </li>
            <li className="left-link">
              <NavLink
                activeClassName="nav-link-selected"
                className="nav-link-dropdown"
                to="/menu"
              >
                Our Menu
              </NavLink>
            </li>
          </div>
          <div className="right"></div>
        </React.Fragment>
      </ul>
    </React.Fragment>
  );
};

export default NavLinks;
