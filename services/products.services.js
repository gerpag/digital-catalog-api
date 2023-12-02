const {Product}=require("../models/index.model")


class ProductServices{

    static async addProduct(data){
        const {name,category,sub_category,url_img,colour}=data

        try{

            if(!name ||!category ||!sub_category ||!url_img || !colour){
                throw new Error("Debe completar todos los campos")
            }

            const newProduct= await Product.create({name,category,sub_category,url_img,colour})

            return newProduct;

        }

        catch (error) {
            // Verifica si el error proviene de una respuesta del servidor
            if (error.response && error.response.data) {
              throw new Error(error.response.data);
            } else {
              // Si es otro tipo de error, lanza el error original
              throw error;
            }
          }

    }

    static async getProducts(data){

        const {category,sub_category,colour}=data

        try{

            const searchQuerys={}

            if(category){
                searchQuerys.category=category
            }
            if(sub_category){
                searchQuerys.sub_category=sub_category
            }
            if(colour){
                searchQuerys.colour=colour
            }

            const products= await Product.find(searchQuerys)

                return products
        
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

module.exports=ProductServices;