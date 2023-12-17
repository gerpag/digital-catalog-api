const express = require("express");
const router = express.Router();
const productRouter = require("./products.routes");
const UserRouter = require("./users.routes");
const imagesRouter=require("./images.routes")

router.use("/product", productRouter);
router.use("/user", UserRouter);
router.use("/images",imagesRouter)

module.exports = router;
