require("dotenv").config();
const exhbs = require("express-handlebars");
const express = require("express");
const path = require("path");
const app = express();
const connectDB = require("./config/db");

// connect to database
connectDB(process.env.DB_CS);

// handlebars middleware
app.engine("handlebars", exhbs({ defaultLayout: "main.handlebars" }));
app.set("view engine", "handlebars");

// body parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// static folder
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  const dDummy = [1, 2, 3, 4, 5, 6, 7, 8];

  res.render("index", {
    dTemplate: dDummy,
  });
});

app.use("/dTest", require("./controller/ShoeController"));

app.get("*", (req, res) => {
  res.status(404).render("errorPage", { layout: "error.handlebars" });
});

app.listen(process.env.DB_HOST, () =>
  console.log("Server started on port 5050")
);
