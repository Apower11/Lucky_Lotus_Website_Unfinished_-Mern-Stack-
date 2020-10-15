import React, { useEffect } from "react";
import Reservation from "./components/shared/Reservation";
import Testimonials from "./components/shared/Testimonials";
import Slideshow from "./components/Home/Slideshow";
import OurStory from "./components/shared/OurStory";
import Chef from "./components/Home/Chef";
import MenuPreview from "./components/Home/MenuPreview";
import Title from "../shared/UIElements/Title";
import "./css/Home.css";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <React.Fragment>
      <Title title="Lucky Lotus - Home"></Title>
      <div className="navbar-placeholder"></div>
      <Slideshow />
      <MenuPreview />
      <OurStory />
      <Testimonials />
      <Chef />
      <Reservation />
    </React.Fragment>
  );
};

export default Home;
