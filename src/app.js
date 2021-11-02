require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const engines = require("consolidate");

// Configs
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.engine("ejs", engines.ejs);
app.set("views", path.join(__dirname, "./src/app/views"));
app.set("view engine", "ejs");

// Routes
const authRouter = require("./app/routes/auth");
const orderRouter = require("./app/routes/order");
const productRouter = require("./app/routes/product");
const paymentRouter = require("./app/routes/payment");

app.use("/auth", authRouter);
app.use("/orders", orderRouter);
app.use("/products", productRouter);
app.use("/payment", paymentRouter);

module.exports = app;
