const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authConfig = require("../../config/auth.json");
const User = require("../models/users");

const router = express.Router();

const generateToken = (params = {}) => {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
};

router.post("/register", async (req, res) => {
  const { email, cpf } = req.body;
  if (await User.findOne({ email })) {
    return res.status(400).send({ error: "User e-mail already exists" });
  }
  if (await User.findOne({ cpf })) {
    return res.status(400).send({ error: "User cpf already exists" });
  }

  const user = await User.create(req.body);

  user.cpf = undefined;
  user.password = undefined;

  return res.send({ user, token: generateToken({ id: user.id }) });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(400).send({ error: "User not found" });
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(400).send({ error: "Invalid password" });
  }

  user.cpf = undefined;
  user.password = undefined;

  res.send({ user, token: generateToken({ id: user.id }) });
});

module.exports = (app) => app.use("/auth", router);
