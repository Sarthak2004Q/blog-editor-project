const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// Save Draft
router.post('/save-draft', async (req, res) => {
  const { id, title, content, tags } = req.body;
  const blogData = {
    title,
    content,
    tags: tags?.split(',') || [],
    status: 'draft',
    updated_at: new Date()
  };

  const blog = id
    ? await Blog.findByIdAndUpdate(id, blogData, { new: true })
    : await new Blog(blogData).save();

  res.json(blog);
});

// Publish Blog
router.post('/publish', async (req, res) => {
  const { id, title, content, tags } = req.body;
  const blogData = {
    title,
    content,
    tags: tags?.split(',') || [],
    status: 'published',
    updated_at: new Date()
  };

  const blog = id
    ? await Blog.findByIdAndUpdate(id, blogData, { new: true })
    : await new Blog(blogData).save();

  res.json(blog);
});

// Get All Blogs
router.get('/', async (req, res) => {
  const blogs = await Blog.find().sort({ updated_at: -1 });
  res.json(blogs);
});


// Get Blog by ID
router.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.json(blog);
});

// ✅ Export router only once at the end
module.exports = router;
