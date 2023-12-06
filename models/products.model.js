const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: false,
    },
    material: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: false,
    },
    dimensions: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    url_img: {
      type: String,
      required: true,
    },
    image: {
      type: {
        filename: String,
        path: String,
      },
    },
  },

 
);
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
