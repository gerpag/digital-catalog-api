const express = require("express");
const imagesRouter = express.Router();
const ImageControllers=require("../controllers/images.controllers")

imagesRouter.get("/",ImageControllers.getImages)
imagesRouter.get("/:imageName",ImageControllers.getImage)
imagesRouter.delete("/:imageName",ImageControllers.deleteImage)

module.exports = imagesRouter;
