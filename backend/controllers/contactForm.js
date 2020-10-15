// Middleware
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

// Models + Http Error
const HttpError = require("../models/http-error");
const User = require("../models/user");
const Thing = require("../models/thing");

const contactFormMethod = async (req, res, next) => {
  const email = await req.body.email;
  const output = `
  <p>You have a new contact request</p>
  <h3>Contact Details</h3>
  <ul>  
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
  </ul>
  <h3>Message</h3>
  <p>${req.body.message}</p>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "Hotmail",
    auth: {
      user: "adampower45@hotmail.com", // generated ethereal user
      pass: "stomedy69", // generated ethereal password
    },
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: "adampower45@hotmail.com", // sender address
    to: "adampower45@hotmail.com", // list of receivers
    subject: req.body.subject, // Subject line
    text: "Hello world?", // plain text body
    html: output, // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.render("contact", { msg: "Email has been sent" });
  });
};

// const postMethod = async (req, res, next) => {
//   // Check for validation errors
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return next(new HttpError("Invalid inputs passed."));
//   }

//   // Get fields from request body
//   const { field1, field2, field3, author } = req.body;

//   // Possible logic for getting other fields

//   // Create new thing with fields, below is a shorthand syntax. field1: field1 === field1
//   const createdThing = new Thing({
//     field1,
//     field2,
//     field3,
//     author,
//   });

//   // Find user through author or similar field that's passed in.

//   let user;

//   try {
//     user = await User.findById(author);
//   } catch (err) {
//     const error = new HttpError("Creating thing failed, please try again", 500);
//     return next(error);
//   }

//   if (!user) {
//     const error = new HttpError("Could not find user for the provided id", 404);
//     return next(error);
//   }

//   // Saving created thing, and linking thing and user together
//   try {
//     const sess = await mongoose.startSession();
//     sess.startTransaction();
//     await createdThing.save({ session: sess });
//     user.posts.push(createdThing);
//     await user.save({ session: sess });
//     await sess.commitTransaction();
//   } catch (err) {
//     const error = new HttpError(
//       "Creating thing failed, please try again.",
//       500
//     );
//     return next(error);
//   }

//   // Return JSON data
//   res.status(201).json({ thing: createdThing });
// };

exports.contactFormMethod = contactFormMethod;
