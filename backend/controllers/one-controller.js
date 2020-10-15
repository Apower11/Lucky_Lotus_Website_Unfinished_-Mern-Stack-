// Middleware
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

// Models + Http Error
const HttpError = require("../models/http-error");
const User = require("../models/user");
const Thing = require("../models/thing");

// Get methods
const getMethod = async (req, res, next) => {
    let things;

    // Fetch things
    try {
        things = await Thing.find();
    } catch(err) {
        const error = new HttpError(
            'Fetching <things> failed, please try again.',
            500
        );
        return next(error)
    }

    // Returning json data. In this case things.
    res.json({things: things.map(thing => thing.toObject({ getters: true }))})
}

const getByUserIdMethod = async (req, res, next) => {
    const userId = req.params.uid;

    // let things and get things with user id using the populate method
    let userWithThings;
    try {
        userWithThings = await userId.findById(userId).populate('things');
    } catch(err) {
        const error = new HttpError(
        'Fetching <things> failed, please try again',
        500);
        return next(error)
    }

    // Check if user has things or user is found
    if(!userWithThings || userWithThings.things.length === 0) {
        return next(
            new HttpError('Could not find <things> for this user.', 404)
        )
    }


    // Return JSON data
    res.json({
        things: userWithThings.things.map(thing => 
            thing.toObject({ getters: true }))
    })
};

const postMethod = async (req, res, next) => {
    // Check for validation errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next (
            new HttpError('Invalid inputs passed.')
        )
    }

    // Get fields from request body
    const { field1, field2, field3, author } = req.body;

    // Possible logic for getting other fields
    
    // Create new thing with fields, below is a shorthand syntax. field1: field1 === field1
    const createdThing = new Thing({
        field1, 
        field2,
        field3,
        author
    });

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

    // Saving created thing, and linking thing and user together
    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdThing.save({ session: sess });
        user.posts.push(createdThing);
        await user.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError(
            'Creating thing failed, please try again.',
            500
        );
        return next(error);
    }

    // Return JSON data
    res.status(201).json({ thing: createdThing });
}

const patchMethod = async (req, res, next) => {
    // Check for validation errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next (
            new HttpError('Invalid inputs passed.')
        )
    }

    // Get fields from request body
    const { field1, field2 } = req.body;
    const thingId = req.params.tid;

    // Fetch thing
    let thing;
    try {
        thing = await Thing.findById(thingId);
    } catch(err) {
        const error = new HttpError(
            'Something went wrong, could not update <thing>',
            500
        );
        return next(error)
    }

    // Give things fields that you got from request body.

    thing.field1 = field1;
    thing.field2 = field2;

    // Save thing

    try {
        await thing.save();
    } catch(err) {
        const error = new HttpError(
            'Something went wrong, could not update <thing>',
            500
        );
        return next(error);
    }

    // Return JSON data.
    res.status(200).json({ thing: thing.toObject({ getters: true })})
};

const deleteMethod = async (req, res, next) => {
    const thingId = req.params.tid;

    // Find thing to be deleted
    let thing;
    try {
        thing = await Thing.findById(thingId).populate('author');
    } catch(err) {
        const error = new HttpError(
            'Something went wrong, could not delete <thing>.',
            500
        );
        return next(error);
    }
    
    //  If thing not found
    if(!thing) {
        const error = new HttpError("Could not delete <thing> with this id.", 404);
        return next(error);
    }

    // Save changes and delete thing from users things as well.
    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await thing.remove({ session: sess });
        thing.author.posts.pull(thing);
        await thing.author.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not delete <thing>',
            500
        );
        return next(error);
    }

    // Return JSON data
    res.status(200).json({ message: 'Deleted <thing>' });
}

exports.getMethod = getMethod;
exports.getByUserIdMethod = getByUserIdMethod;
exports.postMethod = postMethod;
exports.patchMethod = patchMethod;
exports.deleteMethod = deleteMethod;