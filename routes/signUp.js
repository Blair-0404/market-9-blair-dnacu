const express = require("express");
const router = express.Router();

/* GET signUp page. */
router.get("/", function (req, res, next) {
  const locals = {
    title: "회원가입",
  };

  res.render("signUp/signUp.pug", locals);
});

module.exports = router;
