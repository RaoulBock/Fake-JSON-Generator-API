const express = require('express');
const router = express.Router();
const { posts, getNextPostId } = require('../models/posts.models');

router.get('/', (req, res) => res.json(posts));

router.get('/:id', (req, res) => {
  const post = posts.find(p => p.id === +req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.json(post);
});

router.post('/', (req, res) => {
  const { userId, title, body } = req.body;
  if (!userId || !title || !body) return res.status(400).json({ error: "userId, title and body required" });
  const newPost = { id: getNextPostId(), userId, title, body };
  posts.push(newPost);
  res.status(201).json(newPost);
});

router.put('/:id', (req, res) => {
  const post = posts.find(p => p.id === +req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });
  const { userId, title, body } = req.body;
  if (userId) post.userId = userId;
  if (title) post.title = title;
  if (body) post.body = body;
  res.json(post);
});

router.delete('/:id', (req, res) => {
  const index = posts.findIndex(p => p.id === +req.params.id);
  if (index === -1) return res.status(404).json({ error: "Post not found" });
  posts.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
