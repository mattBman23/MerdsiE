const exhbs = require("express-handlebars");
const session = require("express-session");
const _handlebars = require("handlebars");
const connectDB = require("./config/db");
const flash = require("connect-flash");
const passport = require("passport");
const express = require("express");
const path = require("path");
require("dotenv").config();
const app = express();
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

const Shoe = require("./model/Shoe");
// connect to database
connectDB(process.env.DB_CS);

// passport config
require("./model/User");
require("./config/passport")(passport);

// handlebars middleware
app.engine(
  "handlebars",
  exhbs({
    defaultLayout: "main.handlebars",
    handlebars: allowInsecurePrototypeAccess(_handlebars),
  })
);
app.set("view engine", "handlebars");

// body parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: "merdsi",
    resave: true,
    saveUninitialized: true,
  })
);

// passport
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// static folder
app.use(express.static(path.join(__dirname, "public")));

// global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.user = req.user || null;
  next();
});

app.get("/", async (req, res) => {
  try {
    const dShoes = await Shoe.find();
    res.render("index", {
      dTemplate: dShoes,
    });
  } catch (err) {
    console.log("ERROR");
  }
});

app.use("/auth", require("./controller/AuthController"));
app.use("/user", require("./controller/UserController"));

app.get("*", (req, res) => {
  res.status(404).render("errorPage", { layout: "error.handlebars" });
});

app.listen(process.env.DB_HOST, () =>
  console.log("Server started on port 5050")
);
