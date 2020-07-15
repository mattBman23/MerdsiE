const mongoose = require("mongoose");

const ShoeSchema = new mongoose.Schema({
  shoeName: {
    type: String,
    required: true,
  },
  shoeBrand: {
    type: String,
    required: true,
    default: "Vans",
  },
  shoeDesc: {
    type: String,
    required: true,
  },
  shoeGender: {
    type: String,
    required: true,
    default: "Male",
  },
  shoeImg: {
    type: String,
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
