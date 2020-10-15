const express = require("express");
const { check } = require("express-validator");

const oneController = require("../controllers/one-controller");
const contactForm = require("../controllers/contactForm");
const reviewController = require("../controllers/reviewController");
const usersController = require("../controllers/users-controller");

const router = express.Router();

// Get request for fetching
router.get("/", oneController.getMethod);

// Post request for creating. Validating usually happens here
router.post("/contact", contactForm.contactFormMethod);

// Create Review
router.post("/review", reviewController.postReview);

// Get Review
router.get('/reviews', reviewController.getReviews);

// Get review by rating
router.post('/reviews/:rating', reviewController.getFilteredReviews);

// Get review by search term
router.post('/reviews/search-by/:searchTerm', reviewController.searchReviews);

// Sort reviews by highest rating
router.post('/reviews/sort/highest-rating', reviewController.sortReviewsByHighestRating);

// Sort reviews by lowest rating
router.post('/reviews/sort/lowest-rating', reviewController.sortReviewsByLowestRating);

// Delete review
router.delete('/reviews/:rid', reviewController.deleteReview);

// Edit Review
router.patch("/review/edit-review/:rid", reviewController.editReview);

// Register User
router.post("/register", usersController.signup);

// Login
router.post("/login", usersController.login);

// Patch request for editing
router.patch("/:tid", oneController.patchMethod);

// Delete request for deleting
router.delete("/:tid", oneController.deleteMethod);

module.exports = router;
