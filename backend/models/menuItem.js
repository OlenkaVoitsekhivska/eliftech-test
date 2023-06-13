const { Schema } = require("mongoose");

const menuItemSchema = new Schema ({
    title: {type:String},
    price:{type:String},
    qnt:{type:Number, default:0}
  });

module.exports = {menuItemSchema};