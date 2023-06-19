const express = require("express");

const router = express.Router();

const placeOrder = require("../../controllers/placeOrder");

const wrapper = require("../../middleware/ctrlWrapper");

const {validationWrapper} = require("../../helpers/validationWrapper");
const {orderSchema} = require("../../helpers/orderValidation");

router.post("/", validationWrapper(orderSchema), wrapper(placeOrder));


module.exports = router;