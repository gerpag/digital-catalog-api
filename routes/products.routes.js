const express=require("express");
const {Product}=require("../models/index.model")
const ProductsControllers=require("../controllers/products.controllers")

const productRouter=express.Router();


productRouter.post("/add", ProductsControllers.addProduct)
productRouter.get("/search", ProductsControllers.getProducts)
productRouter.put("/edit/:id",ProductsControllers.editProduct)
productRouter.delete("/erase/:id",ProductsControllers.deleteProduct)


module.exports=productRouter;

