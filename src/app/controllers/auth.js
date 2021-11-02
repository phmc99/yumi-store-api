const bcrypt = require("bcryptjs");
const User = require("../models/users");
const Helpers = require("./helpers");

class AuthControllers {
  static async signUp(req, res) {
    try {
      const { email, cpf } = req.body;
      if (await User.findOne({ email })) {
        return res.status(409).json({ error: "User e-mail already exists" });
      }
      if (await User.findOne({ cpf })) {
        return res.status(409).json({ error: "User cpf already exists" });
      }

      const user = await User.create(req.body);

      user.cpf = undefined;
      user.password = undefined;

      return res
        .status(201)
        .json({ user, token: Helpers.generateToken({ id: user.id }) });
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  static async signIn(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (!(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: "Invalid password" });
      }

      user.cpf = undefined;
      user.password = undefined;

      return res
        .status(202)
        .json({ user, token: Helpers.generateToken({ id: user.id }) });
    } catch (err) {
      return res.status(400).json({ error: "Error login failed" });
    }
  }

  static async getUser(req, res) {
    try {
      const user = await User.findById(req.params.userId);

      return res.json({ user });
    } catch (err) {
      return res.status(400).json({ error: "Error loading user" });
    }
  }

  static async updateUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.userId, {
        ...req.body,
        new: true,
      });

      return res.status(202).json({ user });
    } catch (err) {
      return res.status(400).json({ error: "Error updating user" });
    }
  }
}

module.exports = AuthControllers;
