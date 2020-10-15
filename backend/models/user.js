// Require mongoose
const mongoose = require("mongoose");

// Define Schema object
const Schema = mongoose.Schema;

const userSchema = new Schema({
  // Normal fields. Give the type you want and whether it's required.
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  // Link to other collection. Example, references User model to link these two models.
  // Give type as mongoose.Types.ObjectId give whether it's required, and reference the model through ref: 'Model'
  reviews: [{ type: mongoose.Types.ObjectId, required: true, ref: "Review" }],
});

// Export and model the model for the thing
module.exports = mongoose.model("User", userSchema);
