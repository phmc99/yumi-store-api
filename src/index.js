const express = require("express");
const cors = require("cors");
require("express-async-errors");
const path = require("path");
const engines = require("consolidate");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.engine("ejs", engines.ejs);
app.set("views", path.join(__dirname, "./src/app/views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  return res.send({ message: "Yumi Store API" });
});

require("./app/controllers/index")(app);

console.log("API está funcionando!");
app.listen(process.env.PORT || 5001);
