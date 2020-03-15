const express = require("express");
const mongoose = require("mongoose");
const boom = require("boom");
const path = require("path");

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

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "/client/build")));

// user routes
const userRouter = require("./routes/user.routes");
app.use("/api/v1/user", userRouter);

// video routes
const videoRouter = require("./routes/video.routes");
app.use("/api/v1/video", videoRouter);

app.get("*", (req, res) => {
  // react app entry point
  res.sendFile(path.join(__dirname + "/client/build/200.html"));
});

app.post("*", (req, res, next) => {
  return next(boom.notFound("Route Not Found"));
});

const errorHandler = require("./middlewares/errorHandler.middleware");
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
