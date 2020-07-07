const express = require("express");

const app = express();

// Express view engine 을 pug 로 설정
app.set("view engine", "pug");
// root directory 설정 (app.views의 값을 변경한다.)
app.set("views", __dirname + "/pages");

app.get("/", function (req, res, next) {
  const locals = {
    title: "배민상회",
  };

  res.render("main/main.pug", locals);
});

app.get("/signUp", function (req, res, next) {
  const locals = {
    title: "회원가입",
  };

  res.render("signUp/signUp.pug", locals);
});

app.get("/signIn", function (req, res, next) {
  const locals = {
    title: "로그인",
  };

  res.render("signIn/signIn.pug", locals);
});

app.get("/complete", function (req, res, next) {
  const locals = {
    title: "가입완료",
  };

  res.render("signUpComplete/signUpComplete.pug", locals);
});

app.get("*", function (req, res, next) {
  const locals = {
    title: "Not Found",
  };

  res.render("notFound/notFound.pug", locals);
});

app.listen(8080);
