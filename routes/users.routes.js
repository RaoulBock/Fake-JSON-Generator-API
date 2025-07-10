const express = require("express");
const router = express.Router();
const { users, getNextUserId } = require("../models/users.models");

router.get("/", (req, res) => res.json(users));

router.get("/:id", (req, res, next) => {
  const user = users.find((u) => u.id === +req.params.id);
  if (!user) {
    const err = new Error("User not found");
    err.status = 404;
    return next(err);
  }
  res.json(user);
});

router.post("/", (req, res, next) => {
  const { name, email } = req.body;
  if (!name || !email) {
    const err = new Error("Name and email required");
    err.status = 400;
    return next(err);
  }
  const newUser = { id: getNextUserId(), name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

router.put("/:id", (req, res) => {
  const user = users.find((u) => u.id === +req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  const { name, email } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;
  res.json(user);
});

router.delete("/:id", (req, res) => {
  const index = users.findIndex((u) => u.id === +req.params.id);
  if (index === -1) return res.status(404).json({ error: "User not found" });
  users.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
