const mongoose = require("mongoose");
const router = require("express").Router();
const User = require("../models/user");

router.get("/logs/:id", async (req, res, next) => {
  try {
    
    const docs = await User.findById({ _id: req.user.id }, "logs");
    const id = req.params.id;
    const delete_doc = docs.logs.findIndex((user) => user._id == id);
    docs.logs.splice(delete_doc, 1);
    await docs.save();
    res.status(200)
    res.end();
  } catch (err) {
    next(err);
  }
});

router.get("/logs", async (req, res, next) => {
  const doc = await User.findById({ _id: req.user.id }, "logs");
  //console.log(doc)
  res.json(doc);
});

router.post("/logs", async (req, res, next) => {
  try {
    const doc = await User.findById({ _id: req.user.id });
    doc.logs.push(req.body);
    await doc.save();
    res.sendStatus(200)
  } catch (err) {
    res.status(401)
    next(err);
  }
});

module.exports = router;
