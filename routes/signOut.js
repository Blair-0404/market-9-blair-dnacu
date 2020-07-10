const express = require("express");
const router = express.Router();

/* GET signIn page. */
router.get("/", function (req, res, next) {
  const { key, userId } = req.session;
  if (!key || !userId) {
    res.sendStatus(400);
    return;
  }

  req.session.destroy((err) => {
    if (err) {
      res.json({ signOutSuccess: false });
      return;
    }

    res.json({ signOutSuccess: true });
  });
});

module.exports = router;
