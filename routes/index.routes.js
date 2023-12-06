const express = require("express");
const router = express.Router();
const productRouter = require("./products.routes");
const UserRouter = require("./users.routes");

router.use("/product", productRouter);
router.use("/user", UserRouter);

module.exports = router;
