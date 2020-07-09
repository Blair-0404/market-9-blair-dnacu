const express = require("express");
const repository = require("../data/index.js");
const router = express.Router();

/* GET signUp page. */
router.get("/", function (req, res, next) {
  const locals = {
    title: "회원가입",
  };

  res.render("signUp/signUp.pug", locals);
});

router.post("/", function (req, res, next) {
  repository.addUser(req.body).then((id) => {
    res.json({ signUpSuccess: true, userId: id });
  }).catch((err) => {
    res.json({ signUpSuccess: false, error: err });
  });
});

module.exports = router;