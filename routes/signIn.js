const express = require("express");
const router = express.Router();

/* GET signIn page. */
router.get("/", function (req, res, next) {
  const locals = {
    title: "로그인",
  };

  res.render("signIn/signIn.pug", locals);
});

/* POST signIn page. */
router.post("/", function (req, res, next) {
  console.log(req.body);

  // res.sendStatus(200);
  res.json({ signInSuccess: true });
  // res.sendStatus(404);
});

module.exports = router;
