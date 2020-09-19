const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const urlSlug = require('url-slug');
const { DateTime } = require('luxon');
const posts = require('../../Posts');

// Get all posts
router.get('/', (req, res) => res.json(posts));

// Get single post
router.get('/:id', (req, res) => {
  const found = posts.some((post) => post.id === parseInt(req.params.id));

  if (found) {
    res.json(posts.filter((post) => post.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `Post ${req.params.id} not found` });
  }
});

// Create post
router.post('/', (req, res) => {
  //   res.send(req.body);
  const newPost = {
    id: uuid.v4(),
    title: req.body.title,
    content: req.body.content,
    url: urlSlug(req.body.title),
    status: 'active',
    date: DateTime.local().toLocaleString(DateTime.DATE_FULL),
  };
  if (!newPost.title || !newPost.content) {
    return res
      .status(400)
      .json({ msg: 'Please include a post title and content' });
  }

  posts.push(newPost);
  // res.json(posts);
  res.redirect(301, '/');
});

//Update Post
router.put('/:id', (req, res) => {
  const found = posts.some((post) => post.id === parseInt(req.params.id));

  if (found) {
    const updatePost = req.body;
    posts.forEach((post) => {
      if (post.id === parseInt(req.params.id)) {
        post.title = updatePost.title ? updatePost.title : post.title;
        post.content = updatePost.content ? updatePost.content : post.content;

        res.json({ msg: 'Post updated', post });
      }
    });
  } else {
    res.status(400).json({ msg: `Post ${req.params.id} not found` });
  }
});

// Get single post
router.delete('/:id', (req, res) => {
  const found = posts.some((post) => post.id === parseInt(req.params.id));

  if (found) {
    res.json({
      msg: 'Post deleted',
      posts: posts.filter((post) => post.id !== parseInt(req.params.id)),
    });
  } else {
    res.status(400).json({ msg: `Post ${req.params.id} not found` });
  }
});

module.exports = router;
