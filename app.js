// const pug = require("pug");
const express = require("express");

const app = express();

// Express view engine 을 pug 로 설정
app.set("view engine", "pug");

app.get("/", function (req, res, next) {
  const locals = {
    title: "배민상회",
  };

  res.render("Main", locals);
});

app.get("/signUp", function (req, res, next) {
  const locals = {
    title: "회원가입",
  };

  res.render("SignUp", locals);
});

app.get("/signIn", function (req, res, next) {
  const locals = {
    title: "로그인",
  };

  res.render("SignIn", locals);
});

app.listen(8080);
