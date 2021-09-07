const express = require("express");
const User = require("../models/users");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, cpf } = req.body;
  try {
    if (await User.findOne({ email })) {
      return res.status(400).send({ error: "User e-mail already exists" });
    }
    if (await User.findOne({ cpf })) {
      return res.status(400).send({ error: "User cpf already exists" });
    }

    const user = await User.create(req.body);

    user.cpf = undefined;
    user.password = undefined;

    return res.send({ user });
  } catch (err) {
    return res.status(400).send({ error: "Registration failed" });
  }
});

module.exports = (app) => app.use("/auth", router);
