import React, { useEffect } from "react";
import ContactForm from "./components/Contact/ContactForm";
import RestaurantMap from "./components/Contact/ResturantMap";
import Breadcrumbs from "../shared/UIElements/Breadcrumbs";
import Title from "../shared/UIElements/Title";
import "./css/Contact.css";

const Contact = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <React.Fragment>
      <Title title="Lucky Lotus - Contact Us"></Title>
      <div className="navbar-placeholder"></div>
      <Breadcrumbs>Contact Us</Breadcrumbs>
      <ContactForm />
      <RestaurantMap />
    </React.Fragment>
  );
};

export default Contact;
