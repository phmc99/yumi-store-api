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
  try {
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
  } catch (err) {
    return res.status(400).send({ error: err });
  }
});

router.post("/login", async (req, res) => {
  try {
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

    return res.send({ user, token: generateToken({ id: user.id }) });
  } catch (err) {
    return res.status(400).send({ error: "Error login failed" });
  }
});

router.put("/user/:userId", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, {
      ...req.body,
      new: true,
    });

    return res.send({ user });
  } catch (err) {
    return res.status(400).send({ error: "Error changing user" });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    return res.send({ user });
  } catch (err) {
    return res.status(400).send({ error: "Error loading user" });
  }
});

module.exports = (app) => app.use("/auth", router);
