const mongoose = require("mongoose");

const statusSchema = new mongoose.Schema(
  {
    product_id: {
      type: String,
      required: true,
      unique:true
    },
    date: {
        type: String,
        required: true,
      },
      available:{
        type:Boolean,
        required: true,
        default:false
      }
  },

 
);
const Status = mongoose.model("Status", statusSchema);

module.exports = Status;
