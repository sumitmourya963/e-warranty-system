const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");

const errorMiddleware = require("./middleware/error");

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

app.use(cors());

app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "50mb",
    parameterLimit: 100000,
  })
);

app.use(
  bodyParser.json({
    limit: "50mb",
    parameterLimit: 100000,
  })
);
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

// Route Imports

const user = require("./routes/userRoute");
const dealer = require("./routes/dealerRoute");
const product = require("./routes/productRoute");

app.use("/api/v1", user);
app.use("/api/v1", dealer);
app.use("/api/v1", product);

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
