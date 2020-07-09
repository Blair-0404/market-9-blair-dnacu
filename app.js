const path = require("path");
const express = require("express");
const favicon = require("serve-favicon");
const cookieParser = require("cookie-parser");

// import routers...
const routers = require("./routes");

const app = express();

// use favicon
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(express.static(path.join(__dirname, "/public")));

// Express view engine 을 pug 로 설정
// root directory 설정 (app.views의 값을 변경한다.)
app.set("view engine", "pug");
app.set("views", __dirname + "/pages");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());

// routing
app.use("/", routers.mainRouter);
app.use("/signUp", routers.signUpRouter);
app.use("/signIn", routers.signInRouter);
app.use("/complete", routers.completeRouter);
app.use("*", routers.notFoundRouter);

app.listen(process.env.PORT || 8080, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
