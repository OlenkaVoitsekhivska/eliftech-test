const { Schema, model } = require("mongoose");
const {menuItemSchema} = require('./menuItem')

const userSchema = new Schema ({
  name: {type:String},
  email:{type:String},
  phone:{type:Number},
  address:{type:String},
});


const orderSchema = Schema(
  {
    user: {
      type: userSchema,
      required: true,
    },
    items: {
      type: [menuItemSchema],
      required: true,
    },
  },
  { timestamps: true }
);

const Order = model("Order", orderSchema);

module.exports = { Order };