// Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
let cors = require("cors");

// Routes
const oneRoutes = require("./routes/one-routes");
const twoRoutes = require("./routes/one-routes");

// Error model
const HttpError = require("./models/http-error");

// App
const app = express();

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set Headers
app.use(cors());

// Use Routes
app.use("/api/one", oneRoutes);
app.use("/api/two", twoRoutes);

// Error handling
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unkown error occurred" });
});

// Connect to database and listen to port
mongoose
  .connect(
    "mongodb+srv://apower11:stomedy69@cluster1.5mpwi.mongodb.net/luckyLotus?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
