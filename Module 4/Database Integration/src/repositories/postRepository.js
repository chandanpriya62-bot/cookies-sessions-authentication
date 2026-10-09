const seed = require('../data/postSeed');

// Starter implementation: same async contract, temporary in-memory storage.
const posts = seed.map((post) => ({ ...post }));
let nextId = posts.reduce((max, post) => Math.max(max, post.id), 0) + 1;

async function findAll() {
  return posts.map((post) => ({ ...post }));
}

async function findById(id) {
  return posts.find((post) => post.id === Number(id)) || null;
}

async function create(fields) {
  const post = { id: nextId++, title: fields.title, body: fields.body || '', authorId: fields.authorId };
  posts.push(post);
  return { ...post };
}

async function update(id, patch) {
  const post = posts.find((candidate) => candidate.id === Number(id));
  if (!post) return null;
  if (patch.title !== undefined) post.title = patch.title;
  if (patch.body !== undefined) post.body = patch.body;
  return { ...post };
}

async function remove(id) {
  const index = posts.findIndex((post) => post.id === Number(id));
  if (index === -1) return false;
  posts.splice(index, 1);
  return true;
}

module.exports = { findAll, findById, create, update, remove };
