const express = require("express");
const { check } = require("express-validator");

const twoController = require("../controllers/one-controller");

const router = express.Router();

// Get request for fetching
router.get("/", twoController.getMethod);

// Post request for creating. Validating usually happens here
router.post("/",
    [
        check('input')
        .not()
        .isEmpty(),
        check('example')
        .isLength({ min: 6 })
        .isAlphaNumeric()
    ]
,twoController.postMethod);

// Patch request for editing
router.patch("/", twoController.patchMethod);

// Delete request for deleting
router.delete("/:example", twoController.deleteMethod);

module.exports = router;