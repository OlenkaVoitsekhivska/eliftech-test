const { Schema, model } = require("mongoose");

const menuItemSchema = new Schema ({
  title: {type:String},
  price:{type:String},
  qnt:{type:Number, default:0}
});

const restaurantSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    menu: {
      type: [menuItemSchema],
      required: true,
    }
  },
  { timestamps: true }
);

const Restaurant = model("Restaurant", restaurantSchema);

module.exports = { Restaurant };