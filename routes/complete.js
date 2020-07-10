const express = require("express");
const router = express.Router();

/* GET signInComplete page. */
router.get("/", function (req, res, next) {
  const { id, name, email, phone } = req.query;

  if (!id || !name || !email || !phone) {
    res.redirect("/notFound");
    return;
  }

  const locals = {
    title: "가입완료",
    id,
    name,
    email,
    phone,
  };

  res.render("signUpComplete/signUpComplete.pug", locals);
});

module.exports = router;
