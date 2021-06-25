const mongoose = require("mongoose");
const User = require("../models/user");
const router = require("express").Router();

router.post("/", async (req, res, next) => {
  try {
    const user = await User.find({
      email: req.body.email,
      password: req.body.password,
    });
    if (user.length > 0) {
      const error = new Error("user exist plz login");
      res.status(401)
      next(error);
    } else {
      const doc = new User(req.body);
      await doc.save();
      res.json(doc)
    }
  } catch (err) {
    next(err);
  }
});
module.exports = router; 
