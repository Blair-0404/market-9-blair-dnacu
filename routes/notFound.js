const express = require("express");
const router = express.Router();

/* 404 NOT FOUND. */
router.get("/", function (req, res, next) {
  const locals = {
    title: "Not Found",
  };

  res.render("notFound/notFound.pug", locals);
});

module.exports = router;
