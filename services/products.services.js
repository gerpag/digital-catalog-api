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

module.exports=ProductServices;