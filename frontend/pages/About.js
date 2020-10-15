import React, { useEffect } from "react";
import OurStory from "./components/shared/OurStory";
import Testimonials from "./components/shared/Testimonials";
import OurTeam from "./components/About/OurTeam";
import SecretRecipes from "./components/About/SecretRecipes";
import Title from "../shared/UIElements/Title";
import Breadcrumbs from "../shared/UIElements/Breadcrumbs";
import "./css/About.css";

const About = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <React.Fragment>
      <Title title="Lucky Lotus - About Us"></Title>
      <div className="navbar-placeholder"></div>
      <Breadcrumbs>About Us</Breadcrumbs>
      <OurStory />
      <OurTeam />
      <SecretRecipes />
      <Testimonials />
    </React.Fragment>
  );
};

export default About;
