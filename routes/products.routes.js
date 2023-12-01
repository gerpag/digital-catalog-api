const express=require("express");
const {Product}=require("../models/index.model")

const productRouter=express.Router();

//EJEMPLO PARA VER QUE IMPACTA EN MONGO

productRouter.post("/add",(req,res)=>{
    const {name,colours,category}=req.body
    Product.create({name,colours,category})
    .then((product)=>{res.status(201).json({product,message:"Producto agregado"})})
    .catch((error)=>{
      res.status(500).json({message:"Errror al agregar el producto"})
      console.log(error)
    })

})



module.exports=productRouter;

