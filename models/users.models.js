const users = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" }
  ];
  
  const getNextUserId = () => users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
  
  module.exports = { users, getNextUserId };
  