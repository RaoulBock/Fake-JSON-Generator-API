const express = require("express");
const router = express.Router();
const { comments, getNextCommentId } = require("../models/comments.models");

router.get("/", (req, res) => res.json(comments));

router.get("/:id", (req, res) => {
  const comment = comments.find((c) => c.id === +req.params.id);
  if (!comment) return res.status(404).json({ error: "Comment not found" });
  res.json(comment);
});

router.post("/", (req, res) => {
  const { postId, name, email, body } = req.body;
  if (!postId || !name || !email || !body)
    return res
      .status(400)
      .json({ error: "postId, name, email and body required" });
  const newComment = { id: getNextCommentId(), postId, name, email, body };
  comments.push(newComment);
  res.status(201).json(newComment);
});

router.put("/:id", (req, res) => {
  const comment = comments.find((c) => c.id === +req.params.id);
  if (!comment) return res.status(404).json({ error: "Comment not found" });
  const { postId, name, email, body } = req.body;
  if (postId) comment.postId = postId;
  if (name) comment.name = name;
  if (email) comment.email = email;
  if (body) comment.body = body;
  res.json(comment);
});

router.delete("/:id", (req, res) => {
  const index = comments.findIndex((c) => c.id === +req.params.id);
  if (index === -1) return res.status(404).json({ error: "Comment not found" });
  comments.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
