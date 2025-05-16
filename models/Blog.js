const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  tags: [String],
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Blog', blogSchema);
