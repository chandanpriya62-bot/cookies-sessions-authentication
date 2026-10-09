/** In-memory comments store. Already a clean layer - do not change it. */
let store = [];
let nextId = 1;
exports.insert = async ({ postId, authorId, body }) => {
  const comment = { id: nextId++, postId, authorId, body, createdAt: Date.now() };
  store.push(comment);
  return comment;
};
exports.findByPost = async (postId) => store.filter((c) => c.postId === postId);
