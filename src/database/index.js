const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(
  "mongodb+srv://deploy:yumistoreapideploy@cluster0.ttan3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;

module.exports = mongoose;
