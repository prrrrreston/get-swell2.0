const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
// const multer = require('multer');
const postController = require('./../controllers/postController.js');

const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'getSwellPostImgs', // This is the folder where your images will be saved in Cloudinary.
  allowedFormats: ['jpg', 'png'],
  transformation: [{ width: 500, height: 500, crop: 'limit' }]
});

const upload = multer({ storage: storage });

// TEST ROUTE TO GET ALL POSTS
router.get('/', postController.getAllPosts, (req, res) => {
  res.status(200).json(res.locals.allPosts);
});

// GET ALL POSTS BY PREFERENCE
// ADD USER ID as parameter
// fetch will include object of preference properties with each value true or false
router.get('/:id', postController.getFilteredPosts, (req, res) => {
  res.status(200).json(res.locals.filteredPosts);
});

// CREATE NEW POST
router.post('/', upload.single('imageRaw'), postController.createPost, (req, res) => {
  res.status(200).json(res.locals.newPost);
});

// ADD COMMENT
router.patch('/comment', postController.comment, (_, res) => {
  res.status(200).json('Added comment');
});

// DELETE POST
router.delete('/:id', postController.deletePost, (_, res) => {
  res.status(200).json(res.locals.deletedPost);
});

// LIKE POST
router.patch('/likepost/:id', postController.likePost, (req, res) => {
  res.status(200).json(res.locals.updatedPost);
});





module.exports = router;
