const express = require("express");
const router = express.Router();

/* GET signIn page. */
router.get("/", function (req, res, next) {
  const locals = {
    title: "로그인",
  };

  res.render("signIn/signIn.pug", locals);
});
module.exports = router;
