import React, { useEffect } from "react";
import ReviewsContent from "./components/Reviews/ReviewsContent";
import BreadCrumbs from "../shared/UIElements/Breadcrumbs";
import Title from "../shared/UIElements/Title";
import "./css/Reviews.css";

const Reviews = (props) => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <React.Fragment>
      <Title title="Lucky Lotus - Reviews"></Title>
      <div className="navbar-placeholder"></div>
      <BreadCrumbs>Reviews</BreadCrumbs>
      <div className="reviews-container">
        <ReviewsContent />
      </div>
    </React.Fragment>
  );
};

export default Reviews;
