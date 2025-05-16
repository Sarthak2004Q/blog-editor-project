const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const blogRoutes = require('./routes/blogs');

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.static('public')); // ✅ Add this
app.use('/api/blogs', blogRoutes);


app.use('/api/blogs', blogRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(5000, () => console.log("Server running on http://localhost:5000")))
  .catch(err => console.error(err));
