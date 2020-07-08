const express = require("express");
const router = express.Router();

/* GET signInComplete page. */
router.get("/", function (req, res, next) {
  const locals = {
    title: "가입완료",
  };

  res.render("signUpComplete/signUpComplete.pug", locals);
});

module.exports = router;
