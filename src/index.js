const express = require("express");
const cors = require("cors");
require("express-async-errors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.send({ message: "Yumi Store API" });
});

require("./app/controllers/index")(app);

console.log("API está funcionando!");
app.listen(process.env.PORT || 3001);
