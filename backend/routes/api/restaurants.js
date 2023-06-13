const express = require("express");

const router = express.Router();

const getRestaurants = require("../../controllers/getRestaurants");
const getMenu = require("../../controllers/getMenu")

const wrapper = require("../../middleware/ctrlWrapper");

router.get("/", wrapper(getRestaurants));
router.get("/:id", wrapper(getMenu))

module.exports = router;
