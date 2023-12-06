
const { Product } = require('../models/index.model');



class ProductServices {
  static async addProduct(data) {
    const {
      name,
      image,
      category,
      subCategory,
      material,
      description,
      color,
      dimensions,
      quantity,
      url_img,
    } = data;

    try {
      if (!name || !category || !subCategory || !material || !description || !color || !dimensions || !quantity || !url_img) {
        throw new Error('Debe completar todos los campos');
      }

      const newProduct = await Product.create({
        name,
        image,
        category,
        sub_category: subCategory,
        material,
        description,
        colour: color,
        dimensions,
        quantity,
        url_img,
      });

      return newProduct;

      
    } catch (error) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data);
      } else {
        throw error;
      }
    }
  }

  static async getProducts(data) {
    const { category, subCategory, colour } = data;

    try {
      const searchQuerys = {};

      if (category) {
        searchQuerys.category = category;
      }
      if (subCategory) {
        searchQuerys.sub_category = subCategory;
      }
      if (colour) {
        searchQuerys.colour = colour;
      }

      const products = await Product.find(searchQuerys);

      return products;
    } catch (error) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data);
      } else {
        throw error;
      }
    }
  }
}

module.exports = ProductServices;

