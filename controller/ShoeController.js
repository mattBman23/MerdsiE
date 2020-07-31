const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Shoe = require("../model/Shoe");

// post shoe
router.post(
  "/add",
  [
    check("shoeName", "Shoe name is required").not().isEmpty(),
    check("shoeDesc", "Shoe desc is required").not().isEmpty(),
    check("shoeAva", "Shoe stock is invalid").not().isEmpty().isNumeric(),
    check("shoeCost", "Shoe cost is invalid").not().isEmpty().isNumeric(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      shoeName,
      shoeDesc,
      shoeBrand,
      shoeAva,
      shoeCost,
      shoeImg,
      shoeSubImg,
    } = req.body;

    try {
      let dShoeName = await Shoe.findOne({ shoeName });

      if (dShoeName) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Shoe already exists" }] });
      }

      dShoe = new Shoe({
        shoeName,
        shoeDesc,
        shoeBrand,
        shoeAva,
        shoeCost,
        shoeImg,
        shoeSubImg,
      });

      await dShoe.save();

      res.json({ MSG: "NICE" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// auction item

// delete item

//

module.exports = router;
