
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
      colour,
      dimensions,
      quantity,
      url_img,
    } = data;

    try {
     
      const newProduct = await Product.create({
        name,
        image,
        category: Array.isArray(category) ? category : [category],
        sub_category: Array.isArray(subCategory) ? subCategory : [subCategory],
        material,
        description,
        colour: Array.isArray(colour) ? colour : [colour],
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
    const { category, subCategory, colour,_id } = data;

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
      if (_id) {
        searchQuerys._id = _id;
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

    static async editProduct(data,id){

      const {category,sub_category,colour,name,url_img}=data
      

      try{

        const productModified= await Product.findById(id);
        if(!productModified){
          throw new Error ("Producto no encontrado")
        }
        productModified.category=category;
        productModified.sub_category=sub_category;
        productModified.colour=colour;
        productModified.name=name;
        productModified.url_img=url_img;

        return productModified.save()

      }
      catch (error) {
      
        if (error.response && error.response.data) {
          throw new Error(error.response.data);
        } else {
          throw error;
        }
      }
    }

    static async deleteProduct(id){
      try{
        const product= await Product.findById(id)

        if(!product){
          throw new Error ("Producto no encontrado")
        }

        const deleteProduct=await Product.deleteOne({_id:id});
       

        return product
      }

      catch (error) {
      
        if (error.response && error.response.data) {
          throw new Error(error.response.data);
        } else {
          throw error;
        }
      }

    }

}

module.exports = ProductServices;

