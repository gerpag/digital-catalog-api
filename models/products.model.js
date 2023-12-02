const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique:true
    },
    category: {
        type: String,
        required: true,
      },
      sub_category: {
        type: String,
        required: true,
      },
      colour: {
        type: String,
        required: true,
      },
      url_img: {
        type: String,
        required: true,
      },
  },

 
);
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
