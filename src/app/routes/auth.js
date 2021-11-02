const { Router } = require("express");
const AuthControllers = require("../controllers/auth");

const router = Router();

router.post("/register", (req, res) => AuthControllers.signUp(req, res));

router.post("/login", (req, res) => AuthControllers.signIn(req, res));

router.put("/user/:userId", (req, res) => AuthControllers.updateUser(req, res));

router.get("/user/:userId", (req, res) => AuthControllers.getUser(req, res));

module.exports = router;
