const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const compression = require("compression");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

const uri = process.env.MONGO_URI;

app.use(compression());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("welcome");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  if (err.status) {
    return res.status(err.status).json({ error: err.message });
  }
  res.status(500).json({ error: "InternalServerError" });
});

// connect to db and listen on port
mongoose
  .connect(uri)
  .then(() => {
    app.listen(port, () => console.log(`server running at ${port}`));
  })
  .catch((e) => console.log(e));
