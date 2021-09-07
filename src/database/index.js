const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yumistore");
mongoose.Promise = global.Promise;

module.exports = mongoose;
