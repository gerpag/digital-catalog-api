require("dotenv").config();
const express = require('express')
const routes=require("./routes/index.routes")
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express()
const models=require("./models/index.model")

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/v1", routes);


mongoose
  .connect(process.env.MONGODB_URL, {

  })
  .then(() => {
    console.log("MongoDB connected");
    server;
  })
  .catch((error) => {
    console.error(error);
   
  });