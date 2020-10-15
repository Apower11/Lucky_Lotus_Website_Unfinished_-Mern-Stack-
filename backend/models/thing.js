// Require mongoose
const mongoose = require("mongoose");

// Define Schema object
const Schema = mongoose.Schema;

const thingSchema = new Schema({
    // Normal fields. Give the type you want and whether it's required.
    field1: { type: String, required: true },
    field2: { type: Number, required: true },
    field3: {type: String, required: false},
    // Link to other collection. Example, references User model to link these two models.
    // Give type as mongoose.Types.ObjectId give whether it's required, and reference the model through ref: 'Model'
    author: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
});

// Export and model the model for the thing
module.exports = mongoose.model('Thing', thingSchema);