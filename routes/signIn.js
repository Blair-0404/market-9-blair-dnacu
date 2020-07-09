const express = require("express");
const router = express.Router();

const repository = require("../data/index.js");

/* GET signIn page. */
router.get("/", function (req, res, next) {
  const locals = {
    title: "로그인",
  };

  res.render("signIn/signIn.pug", locals);
});

/* POST signIn page. */
router.post("/", function (req, res, next) {
  const { id, password } = req.body;
  if (!id || !password) {
    res.sendStatus(400);
  }

  repository.getUserInfo(id).then((data) => {
    if (!data) res.sendStatus(400);

    res.json({ signInSuccess: data.password === password });
  });
});

module.exports = router;
