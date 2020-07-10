const express = require("express");
const repository = require("../data/index.js");
const router = express.Router();
const bcrypt = require("bcrypt");

/* GET signUp page. */
router.get("/", function (req, res, next) {
  const locals = {
    title: "회원가입",
  };

  res.render("signUp/signUp.pug", locals);
});

router.post("/", function (req, res, next) {
  const saltRounds = 10;
  const userInfo = req.body;

  bcrypt.hash(userInfo.password, saltRounds, function (err, hash) {
    // Store hash in your password DB.
    if (err) throw err;

    repository
      .addUser({ ...userInfo, password: hash })
      .then((id) => {
        res.json({ signUpSuccess: true, userId: id });
      })
      .catch((err) => {
        res.json({ signUpSuccess: false, error: err });
      });
  });
});

module.exports = router;
