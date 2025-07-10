const posts = [
    { id: 1, userId: 1, title: "Hello World", body: "This is my first post." },
    { id: 2, userId: 2, title: "Hi there", body: "This is Bob's post." }
  ];
  
  const getNextPostId = () => posts.length ? Math.max(...posts.map(p => p.id)) + 1 : 1;
  
  module.exports = { posts, getNextPostId };
  