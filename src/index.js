const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors);

require("./app/controllers/index")(app);

console.log("API está funcionando!");
app.listen(process.env.PORT || 3001);
