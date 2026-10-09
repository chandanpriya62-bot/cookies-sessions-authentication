/** In-memory votes store. Already a clean layer - do not change it. */
let store = [];
exports.find = async (postId, userId) => store.find((v) => v.postId === postId && v.userId === userId) || null;
exports.insert = async (postId, userId) => {
  const vote = { postId, userId, at: Date.now() };
  store.push(vote);
  return vote;
};
exports.countByPost = async (postId) => store.filter((v) => v.postId === postId).length;
