const pug = require("pug");
const express = require("express");

const app = express();

// Express view engine을 pug로 설정
app.set("view engine", "pug");

app.get("/", function (req, res, next) {
  const locals = {
    title: "market-9",
  };

  res.render("SignUp", locals);
});

app.listen(8080);
