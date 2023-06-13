const express = require("express");

const router = express.Router();

const placeOrder = require("../../controllers/placeOrder");

const wrapper = require("../../middleware/ctrlWrapper");

router.post("/", wrapper(placeOrder));


module.exports = router;