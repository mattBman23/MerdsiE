const mongoose = require("mongoose");

const ShoeSchema = new mongoose.Schema({
  shoeName: {
    type: String,
    required: true,
  },
  shoeBrand: {
    type: String,
    required: true,
    default: "Nike",
  },
  shoeDesc: {
    type: String,
    required: true,
  },
  shoeImg: {
    type: String,
    default: "dImg",
  },
  shoeSubImg: [
    {
      subImgPath: {
        type: String,
      },
    },
  ],
  shoeAva: {
    type: Number,
  },
  shoeCost: {
    type: Number,
  },
  shoeLastRestockDay: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Shoe = mongoose.model("shoe", ShoeSchema);
