import React from "react";
import Button from "../../../shared/UIElements/Button";
import { NavLink } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const Testimonials = (props) => {
  return (
    <React.Fragment>
      <div className="testimonials">
        <h1>Testimonials</h1>
        <OwlCarousel
          className="owl-theme"
          loop
          margin={10}
          nav={true}
          items={1}
          dots
        >
          <div className="item testimonial">
            <h3>"An excellent place to eat."</h3>
            <div
              className="profilePic"
              style={{ backgroundImage: "url('./images/john-doe.jpg')" }}
            ></div>
            <p>John Doe</p>
          </div>
          <div className="item testimonial">
            <h3>"The finest Chinese food you'll eat."</h3>
            <div
              className="profilePic"
              style={{ backgroundImage: "url('./images/john-doe.jpg')" }}
            ></div>
            <p>Jane Doe</p>
          </div>
          <div className="item testimonial">
            <h3>"Pretty damn good."</h3>
            <div
              className="profilePic"
              style={{ backgroundImage: "url('./images/john-doe.jpg')" }}
            ></div>
            <p>Joe Doe</p>
          </div>
        </OwlCarousel>

        <NavLink to="/reviews">
          <Button className="more-reviews">More Reviews</Button>
        </NavLink>
      </div>
    </React.Fragment>
  );
};

export default Testimonials;
