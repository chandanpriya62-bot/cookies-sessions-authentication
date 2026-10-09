/**
 * In-memory posts store. Already a clean layer - do not change it.
 * Seed data includes a fresh post, an old post (>24h), and a locked post,
 * so you can exercise each domain rule.
 */
const DAY = 24 * 60 * 60 * 1000;
let store = [
  { id: 1, authorId: 1, title: 'Welcome',      body: 'First post.',         createdAt: Date.now(),            locked: false, commentCount: 0 },
  { id: 2, authorId: 2, title: 'Old post',     body: 'Created two days ago.', createdAt: Date.now() - 2 * DAY, locked: false, commentCount: 0 },
  { id: 3, authorId: 1, title: 'Locked post',  body: 'No more comments.',    createdAt: Date.now(),            locked: true,  commentCount: 0 },
];
let nextId = 4;

exports.findAll = async () => [...store];
exports.findById = async (id) => store.find((p) => p.id === id) || null;
exports.insert = async ({ authorId, title, body }) => {
  const post = { id: nextId++, authorId, title, body, createdAt: Date.now(), locked: false, commentCount: 0 };
  store.push(post);
  return post;
};
exports.update = async (id, changes) => {
  const post = store.find((p) => p.id === id);
  if (!post) return null;
  Object.assign(post, changes);
  return post;
};
exports.incrementCommentCount = async (id) => {
  const post = store.find((p) => p.id === id);
  if (post) post.commentCount += 1;
  return post;
};
