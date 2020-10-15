// Middleware
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

// Models + Http Error
const HttpError = require("../models/http-error");
const User = require("../models/user");
const Review = require("../models/review");

const postReview = async (req, res, next) => {
  console.log(346);
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs passed."));
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get fields from request body
  const { rating, review, author } = req.body;

  const date = new Date();

  const postedAt = `${
    months[date.getMonth()]
  } ${date.getDate()} ${date.getFullYear()}`;

  // Possible logic for getting other fields

  // Find user through author or similar field that's passed in.

  let user;

  try {
      user = await User.findById(author);
  } catch (err) {
      const error = new HttpError('Creating thing failed, please try again', 500);
      return next(error);
  }

  if(!user) {
      const error = new HttpError("Could not find user for the provided id", 404);
      return next(error);
  }

  // Create new thing with fields, below is a shorthand syntax. field1: field1 === field1
  const createdReview = new Review({
    review,
    rating,
    postedAt,
    authorName: user.fullName,
    author
  });


  // Saving created thing, and linking thing and user together
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdReview.save({ session: sess });
    user.reviews.push(createdReview);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Creating thing failed, please try again.",
      500
    );
    return next(error);
  }

  // Return JSON data
  res.status(201).json({ review: createdReview });
};

const getReviews = async (req, res, next) => {
  let reviews;

  // Fetch reviews
  try {
      reviews = await Review.find();
  } catch(err) {
      const error = new HttpError(
          'Fetching reviews failed, please try again.',
          500
      );
      return next(error)
  }

  // Returning json data. In this case reviews.
  res.json({reviews: reviews.reverse().map(review => review.toObject({ getters: true }))})
}

const getFilteredReviews = async (req, res, next) => {

  let reviews;
  let rating = req.params.rating;

  // Fetch reviews
  try {
      reviews = req.body.reviews;
  } catch(err) {
      const error = new HttpError(
          'Fetching reviews failed, please try again.',
          500
      );
      return next(error)
  }
  console.log('Reviews', reviews);
  console.log('Reviews Ratings', reviews.map(review => {console.log(review)}));
  console.log('Rating', rating);

  const returnedReviews = reviews.filter(review => review.rating === rating);

  // Returning json data. In this case reviews.
  res.json({reviews: returnedReviews})
}

const searchReviews = async (req, res, next) => {
  let reviews;
  let results = [];
  let searchTerm = req.params.searchTerm.toUpperCase();

  // Fetch reviews
  try {
      reviews = req.body.reviews;
  } catch(err) {
      const error = new HttpError(
          'Fetching <reviews> failed, please try again.',
          500
      );
      return next(error)
  }

  reviews.map(review => {
    if(review.review.toUpperCase().indexOf(searchTerm.toUpperCase()) !== -1 || review.authorName.toUpperCase().indexOf(searchTerm.toUpperCase()) !== -1) {
      results.push(review);
    }
  });

  res.json({reviews: results});
}

const sortReviewsByHighestRating = async (req, res, next) => {
  let reviews;
  console.log(123);

  // Fetch reviews
  try {
      reviews = req.body.reviews;
      console.log(reviews);
  } catch(err) {
      const error = new HttpError(
          'Fetching reviews failed, please try again.',
          500
      );
      return next(error)
  }

  const sortedReviews = reviews.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));

  console.log(sortedReviews);

  const returnedReviews = sortedReviews.length > 1 ? sortedReviews.map(review => review) : sortedReviews[0];

  res.json({reviews: returnedReviews});
}

const sortReviewsByLowestRating = async (req, res, next) => {
  let reviews;
  console.log(123);

  // Fetch reviews
  try {
      reviews = req.body.reviews;
      console.log(reviews);
  } catch(err) {
      const error = new HttpError(
          'Fetching reviews failed, please try again.',
          500
      );
      return next(error)
  }

  const sortedReviews = reviews.sort((a, b) => parseFloat(a.rating) - parseFloat(b.rating));

  const returnedReviews = sortedReviews.length > 1 ? sortedReviews.map(review => review) : sortedReviews[0];

  res.json({reviews: returnedReviews});
}

const deleteReview = async (req, res, next) => {
  const reviewId = req.params.rid;

    // Find thing to be deleted
    let review;
    try {
        review = await Review.findById(reviewId).populate('author');
        console.log(review.author);
    } catch(err) {
        const error = new HttpError(
            'Something went wrong, could not delete review.',
            500
        );
        return next(error);
    }
    
    //  If thing not found
    if(!review) {
        const error = new HttpError("Could not delete <thing> with this id.", 404);
        return next(error);
    }

    // Save changes and delete thing from users things as well.
    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await review.remove({ session: sess });
        review.author.reviews.pull(review);
        await review.author.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not delete <thing>',
            500
        );
        return next(error);
    }

    // Return JSON data
    res.status(200).json({ message: 'Deleted Review' });
}

const editReview = async (req, res, next) => {
  console.log(345);
  // Check for validation errors
  const errors = validationResult(req);
  if(!errors.isEmpty()){
      return next (
          new HttpError('Invalid inputs passed.')
      )
  }

  // Get fields from request body
  const { rating, reviewContent } = req.body;
  const reviewId = req.params.rid;

  // Fetch thing
  let review;
  console.log(Review.findById(reviewId));
  try {
      review = await Review.findById(reviewId);
  } catch(err) {
      const error = new HttpError(
          'Something went wrong, could not update <thing>',
          500
      );
      return next(error)
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date();

  const postedAt = `${
    months[date.getMonth()]
  } ${date.getDate()} ${date.getFullYear()}`;

  // Give things fields that you got from request body.


  review.review = reviewContent;
  review.rating = rating;
  review.postedAt = postedAt;


  // Save thing

  try {
      await review.save();
  } catch(err) {
      const error = new HttpError(
          'Something went wrong, could not update <thing>',
          500
      );
      return next(error);
  }

  // Return JSON data.
  res.status(200).json({ review: review.toObject({ getters: true })})

}

exports.postReview = postReview;
exports.getReviews = getReviews;
exports.editReview = editReview;
exports.deleteReview = deleteReview;
exports.getFilteredReviews = getFilteredReviews;
exports.searchReviews = searchReviews;
exports.sortReviewsByHighestRating = sortReviewsByHighestRating;
exports.sortReviewsByLowestRating = sortReviewsByLowestRating;