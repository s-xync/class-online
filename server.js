const express = require("express");
const mongoose = require("mongoose");
const HttpStatus = require("http-status-codes");

const constants = require("./config/constants");

const app = express();

const port = constants.PORT;

// configure bodyparser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const uri = constants.MONGO_URI;

// connect to mongodb using monogoose
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true
  // useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// // user routes
// const userRouter = require("./routes/user.routes");
// app.use("/user", userRouter);

// any routes that does not match above
app.get("*", (req, res) => {
  res.status(HttpStatus.NOT_FOUND).json({ message: "Route Not Found." });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});