import React, { useEffect } from "react";
import Button from "../../../shared/UIElements/Button";
import { NavLink } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const MenuPreview = (props) => {
  useEffect(() => {
    AOS.init();
  });
  return (
    <div className="menu-preview">
      <h1>Menu Preview</h1>
      <h3>Here are some of our dishes</h3>
      <ul className="preview-items">
        <li data-aos="fade-right" className="preview-item">
          <img src="./images/landing-page-menu-item-1.jpg" alt="Hello" />
          <h2>Soups</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            dolor est, tempor pulvinar lacinia ac, suscipit a ligula. Cras
            malesuada nisi in aliquam viverra.{" "}
          </p>
        </li>
        <li data-aos="fade-down" className="preview-item">
          <img src="./images/landing-page-menu-item-2.jpg" alt="Hello" />
          <h2>Noodles</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            dolor est, tempor pulvinar lacinia ac, suscipit a ligula. Cras
            malesuada nisi in aliquam viverra.{" "}
          </p>
        </li>
        <li data-aos="fade-left" className="preview-item">
          <img src="./images/landing-page-menu-item-3.jpg" alt="Hello" />
          <h2>Dumplings</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            dolor est, tempor pulvinar lacinia ac, suscipit a ligula. Cras
            malesuada nisi in aliquam viverra.{" "}
          </p>
        </li>
      </ul>
      <NavLink className="menu-link" to="/menu">
        <Button className="menu-button">See Full Menu</Button>
      </NavLink>
    </div>
  );
};

export default MenuPreview;
