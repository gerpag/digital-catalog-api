const ProductServices=require("../services/products.services")
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/images'),
    filename: (req, file, cb) => {
      cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    },
  });
  
  const upload = multer({ storage }).single('image');
  
  class ProductControllers {
    static async addProduct(req, res) {

      upload(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ error: 'Error uploading image.' });
        }
        
        console.log('Form Data:', req.body);

        const {
          image,
          name,
          category,
          subCategory,
          material,
          description,
          color,
          dimensions,
          quantity,
        } = req.body;
  
        const url_img = `/images/${req.file.filename}`;
  
        try {
          const newProduct = await ProductServices.addProduct({
            image,
            name,
            category,
            subCategory,
            material,
            description,
            color,
            dimensions,
            quantity,
            url_img,
          });
          res.status(201).json(newProduct);
        } catch (error) {
          console.log(error);
          res.status(400).json({ error: error.message });
        }
      });
    }
  
    static async getProducts(req, res) {
      const { category, subCategory, colour } = req.query;
  
      try {
        const products = await ProductServices.getProducts({
          category,
          subCategory,
          colour,
        });
  
        res.status(200).json(products);
      } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
      }
    }
  }
  
  module.exports = ProductControllers;


// const ProductServices=require("../services/products.services")
// const multer = require('multer');
// const path = require('path');


// const storage = multer.diskStorage({
//   destination: path.join(__dirname, '../public/images'), 
//   filename: (req, file, cb) => {
//     cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
//   },
// });

// const upload = multer({ storage }).single('image');

// class ProductControllers {
//   static async addProduct(req, res) {
//     upload(req, res, async (err) => {
//       if (err) {
//         return res.status(400).json({ error: 'Error uploading image.' });
//       }

//       const { name, category, sub_category, colour } = req.body;
//       const url_img = `/images/${req.file.filename}`; 

//       try {
//         const newProduct = await ProductServices.addProduct({ name, category, sub_category, url_img, colour });
//         res.status(201).json(newProduct);
//       } catch (error) {
//         console.log(error);
//         res.status(400).json({ error: error.message });
//       }
//     });
//   }



//     static async getProducts(req,res){
//         const {category,sub_category,colour}=req.query

//         try{
//             const products=await ProductServices.getProducts({category,sub_category,colour})

//             res.status(200).json(products)

//         }
//         catch(error){
//             console.log(error)
//         res.status(400).json({ error: error.message });

//         }
//     }
// }

// module.exports=ProductControllers