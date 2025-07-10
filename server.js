const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// Import routes
const userRoutes = require("./routes/users.routes");
const postRoutes = require("./routes/posts.routes");
const commentRoutes = require("./routes/comments.routes");

// Use routes
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  if (err.isOperational) {
    // Known, operational error
    return res.status(err.statusCode).json({ error: err.message });
  }

  // Unknown or programming errors
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
