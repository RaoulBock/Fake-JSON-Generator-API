const comments = [
    { id: 1, postId: 1, name: "Charlie", email: "charlie@example.com", body: "Nice post!" }
  ];
  
  const getNextCommentId = () => comments.length ? Math.max(...comments.map(c => c.id)) + 1 : 1;
  
  module.exports = { comments, getNextCommentId };
  