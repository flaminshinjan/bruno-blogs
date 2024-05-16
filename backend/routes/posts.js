// backend/routes/posts.js
const express = require('express');
const authMiddleware = require('../middleware/auth');
const Post = require('../models/Post');
const { getNotionPageContent, getNotionBlocks } = require('../notion');

const router = express.Router();

router.post('/post', authMiddleware, async (req, res) => {
  const { title, content } = req.body;
  const post = new Post({ title, content, authorId: req.userId });
  await post.save();
  res.status(201).send(post);
});

router.get('/posts', async (req, res) => {
  const { author } = req.query;
  const filter = author ? { authorId: author } : {};
  const posts = await Post.find(filter).sort({ createdAt: -1 });
  res.send(posts);
});

router.get('/notion/page/:pageId', async (req, res) => {
  try {
    const { pageId } = req.params;
    const pageContent = await getNotionPageContent(pageId);
    const blocks = await getNotionBlocks(pageId);
    res.send({ pageContent, blocks });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
