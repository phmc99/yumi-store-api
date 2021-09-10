const express = require("express");
var cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  return res.send({ message: "Yumi Store API" });
});

require("./app/controllers/index")(app);

console.log("API está funcionando!");
app.listen(process.env.PORT || 3001);
