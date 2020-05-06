const exhbs = require("express-handlebars");
const express = require("express");
const path = require("path");
const app = express();

// handlebars middleware
app.engine("handlebars", exhbs());
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

app.listen(5050, () => console.log("Server started on port 5050"));
