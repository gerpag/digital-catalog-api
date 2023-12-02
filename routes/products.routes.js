const express=require("express");
const {Product}=require("../models/index.model")
const ProductsControllers=require("../controllers/products.controllers")
const Status=require("../models/status.model")

const productRouter=express.Router();


productRouter.post("/add", ProductsControllers.addProduct)
productRouter.get("/all", ProductsControllers.getProducts)

productRouter.post("/ocupied",(req,res)=>{
    const {date,product_id}=req.body

    Status.create({date,product_id})
    .then((response)=>{res.status(201).json(response)})
    .catch((error)=>{console.log(error)})

})



module.exports=productRouter;

