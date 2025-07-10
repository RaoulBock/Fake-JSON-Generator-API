const express = require("express");
const app = express();
app.use(express.json());

const PORT = 3000;

// In-memory data storage
let users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];

let posts = [
  { id: 1, userId: 1, title: "Hello World", body: "This is my first post." },
  { id: 2, userId: 2, title: "Hi there", body: "This is Bob's post." },
];

let comments = [
  {
    id: 1,
    postId: 1,
    name: "Charlie",
    email: "charlie@example.com",
    body: "Nice post!",
  },
];

// Utility function to get next ID
const getNextId = (items) =>
  items.length ? Math.max(...items.map((i) => i.id)) + 1 : 1;

// Routes

// --- Users ---
app.get("/users", (req, res) => res.json(users));
app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === +req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email)
    return res.status(400).json({ error: "Name and email required" });
  const newUser = { id: getNextId(users), name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});
app.put("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === +req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  const { name, email } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;
  res.json(user);
});
app.delete("/users/:id", (req, res) => {
  const index = users.findIndex((u) => u.id === +req.params.id);
  if (index === -1) return res.status(404).json({ error: "User not found" });
  users.splice(index, 1);
  res.status(204).send();
});

// --- Posts ---
app.get("/posts", (req, res) => res.json(posts));
app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === +req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.json(post);
});
app.post("/posts", (req, res) => {
  const { userId, title, body } = req.body;
  if (!userId || !title || !body)
    return res.status(400).json({ error: "userId, title and body required" });
  const newPost = { id: getNextId(posts), userId, title, body };
  posts.push(newPost);
  res.status(201).json(newPost);
});
app.put("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === +req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });
  const { userId, title, body } = req.body;
  if (userId) post.userId = userId;
  if (title) post.title = title;
  if (body) post.body = body;
  res.json(post);
});
app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id === +req.params.id);
  if (index === -1) return res.status(404).json({ error: "Post not found" });
  posts.splice(index, 1);
  res.status(204).send();
});

// --- Comments ---
app.get("/comments", (req, res) => res.json(comments));
app.get("/comments/:id", (req, res) => {
  const comment = comments.find((c) => c.id === +req.params.id);
  if (!comment) return res.status(404).json({ error: "Comment not found" });
  res.json(comment);
});
app.post("/comments", (req, res) => {
  const { postId, name, email, body } = req.body;
  if (!postId || !name || !email || !body)
    return res
      .status(400)
      .json({ error: "postId, name, email and body required" });
  const newComment = { id: getNextId(comments), postId, name, email, body };
  comments.push(newComment);
  res.status(201).json(newComment);
});
app.put("/comments/:id", (req, res) => {
  const comment = comments.find((c) => c.id === +req.params.id);
  if (!comment) return res.status(404).json({ error: "Comment not found" });
  const { postId, name, email, body } = req.body;
  if (postId) comment.postId = postId;
  if (name) comment.name = name;
  if (email) comment.email = email;
  if (body) comment.body = body;
  res.json(comment);
});
app.delete("/comments/:id", (req, res) => {
  const index = comments.findIndex((c) => c.id === +req.params.id);
  if (index === -1) return res.status(404).json({ error: "Comment not found" });
  comments.splice(index, 1);
  res.status(204).send();
});

// Start server
app.listen(PORT, () => {
  console.log(`JSON Placeholder API running on http://localhost:${PORT}`);
});
