const ProductServices=require("../services/products.services")

class ProductControllers{

    static async addProduct(req,res){
        const {name,category,sub_category,url_img,colour}=req.body

        try{
            const newProduct=await ProductServices.addProduct({name,category,sub_category,url_img,colour})
            res.status(201).json(newProduct)
        }

        catch(error){
            console.log(error)
        res.status(400).json({ error: error.message });

        }
    }

    static async getProducts(req,res){
        const {category,sub_category,colour,availableFrom,availableUntil}=req.query

        try{
            const products=await ProductServices.getProducts({category,sub_category,colour,availableFrom,availableUntil})

            res.status(200).json(products)

        }
        catch(error){
            console.log(error)
        res.status(400).json({ error: error.message });

        }
    }
}

module.exports=ProductControllers