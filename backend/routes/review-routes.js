const express = require("express");
const { check } = require("express-validator");

const oneController = require("../controllers/one-controller");
const contactForm = require("../controllers/contactForm");
const reviewController = require("../controllers/reviewController");
const usersController = require("../controllers/users-controller");

const router = express.Router();