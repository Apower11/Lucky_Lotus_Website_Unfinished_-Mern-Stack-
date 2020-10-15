// Require mongoose
const mongoose = require("mongoose");

// Define Schema object
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  // Normal fields. Give the type you want and whether it's required.
  review: { type: String, required: true },
  rating: { type: Number, required: true },
  postedAt: { type: String, required: true },
  authorName: {type: String, required: true},
  // Link to other collection. Example, references User model to link these two models.
  // Give type as mongoose.Types.ObjectId give whether it's required, and reference the model through ref: 'Model'
  author: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
});

// Export and model the model for the thing
module.exports = mongoose.model("Review", reviewSchema);
