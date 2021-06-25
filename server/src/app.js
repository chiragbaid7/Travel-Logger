const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();
const home = require("./api/home");
const login = require("./api/login");
const signin = require("./api/sigin");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path");
const logout=require("./api/logout")
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    allowedHeaders: ["Content-Type"],
  })
);
app.options("*", cors());
app.use(morgan("common"));
app.use(helmet());
mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(__dirname, "../client", "/build");
  app.use(express.static(buildPath));
}
app.listen(process.env.PORT || 8080);

const auth = async (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    const payload = jwt.verify(token, "secret", (err, payload) => {
      if (err) {
        console.log(err.message);
        next(err);
      } else {
        req.user = payload;
        next();
      }
    });
  } else {
    const error = new Error("Login to continue");
    console.log("plz login");
    res.status(401);
    next(error);
  }
};
app.use("/signin", signin); //token generate
app.use("/login", login); //token generate
app.use("/api", auth, home);
app.use("/logout",auth,logout)
/*
404 Page not found
*/

app.use((req, res, next) => {
  const error = new Error(`Page Not Found ${req.url}`);
  res.status(404);
  next(error);
});
app.use((error, req, res, next) => {
  const status = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(status);
  res.json({
    message: error.message,
    name: error.name,
  });
});
