const { ensureAuthenticated } = require("../helpers/auth");
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Shoe = require("../model/Shoe");

// get all shoes
router.get("/", async (req, res) => {
  try {
    const shoes = await Shoe.find();
    res.render("shoes", {
      shoes,
    });
  } catch (err) {
    console.log("ERROR");
  }
});

router.get("/checkout", ensureAuthenticated, (req, res) => {
  res.render("checkout");
});

// view cart
router.get("/cart", async (req, res) => {
  const dTemplate = await Shoe.find();
  let totalAmt = global.dCart
    .map((x) => x.shoeCost)
    .reduce((acc, cur) => acc + cur);
  res.render("cart", { dTemplate, totalAmt });
});

// get shoe by id
router.get("/:id", async (req, res) => {
  try {
    const shoeItem = await Shoe.findOne({ _id: req.params.id });
    res.render("shoe", { shoeItem });
  } catch (err) {
    console.log("ERROR");
  }
});

// add to cart
router.post("/addCart/:id", async (req, res) => {
  const shoeItem = await Shoe.findOne({ _id: req.params.id });
  global.dCart.push(shoeItem);
  res.redirect("/");
});

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

module.exports = router;
