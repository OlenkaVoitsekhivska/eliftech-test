const { ObjectId } = require("mongodb");
const { Schema } = require("mongoose");

const menuItemSchema = new Schema({
  title: { type: String },
  price: { type: String },
  qnt: { type: Number, default: 0 },
  _id: { type: ObjectId },
  shopId: { type: ObjectId },
});

module.exports = { menuItemSchema };
