import React, { useContext } from "react";
import Button from "../../../shared/UIElements/Button";
import { AuthContext } from "../../../shared/context/auth-context";
import "../../css/Review.css";

const Review = (props) => {
  let rating = props.review.rating;
  const auth = useContext(AuthContext);
  let userId = auth.user._id;
  const deleteReview = (review) => {
    props.deleteReviewHandler(props.review._id);
  }
  const editReview = (review) => {
    props.editReviewHandler(props.review.rating, props.review.review, props.review._id)
  }
  return (
    <div className="review">
      <div className="rating">
        <span className={`fa fa-star ${rating >= 1 && "checked"} `}></span>
        <span className={`fa fa-star ${rating >= 2 && "checked"} `}></span>
        <span className={`fa fa-star ${rating >= 3 && "checked"} `}></span>
        <span className={`fa fa-star ${rating >= 4 && "checked"} `}></span>
        <span className={`fa fa-star ${rating >= 5 && "checked"} `}></span>
        <span className="rating-text">{rating} out of 5 stars </span>
      </div>
      <div className="user">
        
        <span className="user-name">{props.review.authorName} - </span>
        <span className="user-posted__at">&nbsp;{props.review.postedAt}</span>
      </div>
      <div className="review-description">
        <p>{props.review.review}</p>
      </div>
      {userId === props.review.author && (<React.Fragment>
        <Button onClick={deleteReview}>Delete</Button>
      <Button onClick={editReview}>Edit</Button>
      </React.Fragment>)}
    </div>
  );
};

export default Review;
