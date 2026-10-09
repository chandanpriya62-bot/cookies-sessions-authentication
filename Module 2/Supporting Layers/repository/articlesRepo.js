/**
 * Articles repository — STARTER (in-memory). You do NOT need to change this file.
 * It is already a clean layer: a private store plus named methods.
 */

let store = [{ id: 1, title: 'Hello World', body: 'First article.' }];
let nextId = 2;

exports.findAll = async () => [...store];
exports.findById = async (id) => store.find((a) => a.id === id) || null;
exports.count = async () => store.length;

exports.insert = async ({ title, body }) => {
  const article = { id: nextId++, title, body };
  store.push(article);
  return article;
};

exports.update = async (id, data) => {
  const article = store.find((a) => a.id === id);
  if (!article) return null;
  Object.assign(article, data);
  return article;
};
