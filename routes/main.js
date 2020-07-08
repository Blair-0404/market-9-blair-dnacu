const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  const locals = {
    title: "배민상회",
  };

  res.render("main/main.pug", locals);
});

module.exports = router;
