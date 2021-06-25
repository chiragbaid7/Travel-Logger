const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

router.post("/", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //check for credentials
    console.log(req.body);
    const user = await User.findOne({ email: email, password: password });
    if (user) {
      //assign a jwt token
      const token = jwt.sign({ id: user._id }, "secret", {
        expiresIn: "2h",
      });
      res.cookie("token", token, { httpOnly: true, maxAge: 60 * 900000 });
      res.status(200);
      res.json(user)
    } else {
      //wrong credentials
      const err = new Error("User not exists");
      res.status(401);
      next(err);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
