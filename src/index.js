const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require("./app/controllers/index")(app);

console.log("API está funcionando!");
app.listen(3001);
