const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();
const repository = require("../data/index.js");

/* GET signIn page. */
router.get("/", function (req, res, next) {
  const locals = {
    title: "로그인",
  };

  const { key, userId } = req.session;
  if (key && userId) {
    res.redirect("/");
    return;
  }

  res.render("signIn/signIn.pug", locals);
});

/* POST signIn page. */
router.post("/", function (req, res, next) {
  const { id, password } = req.body;
  if (!id || !password) {
    res.sendStatus(400);
    return;
  }

  repository.getUserInfo(id).then((data) => {
    if (!data) {
      res.sendStatus(400);
      return;
    }

    bcrypt.compare(password, data.password, function (err, result) {
      if (err) throw err;

      req.session.key = req.sessionID;
      req.session.userId = data.id;

      res.json({ signInSuccess: result });
    });
  });
});

module.exports = router;
