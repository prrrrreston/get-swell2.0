const { Activity } = require('../models/models');
const { Comment } = require('../models/models');

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'datlwdq78',
  api_key: '983267157262985',
  api_secret: 'VUl34AoYoCZmFNgE50vcMvoW074',
});


const postController = {};

// TEST ROUTE FOR ALL POSTS
postController.getAllPosts = async (req, res, next) => {
  console.log('entered getAllPosts');
  try {
    const allPosts = await Activity.find({}).populate('userID');
    res.locals.allPosts = allPosts;
    return next();
  } catch (error) {
    return next({
      log: `postController.getAllPosts: ERROR ${err}`,
      status: 400,
      message: { err: 'An error occurred' },
    });
  }
};

// GET ALL POSTS filtered by preference
// TODO: This doesn't work right now. At the moment we are handling the filtering on the front-end.
postController.getFilteredPosts = async (_, res, next) => {
  console.log('entered getFilteredPosts');
  try {
    const postData = await Activity.find({
      preference: {
        $in: user.preferences,
      },
    });
    res.locals.filteredPosts = postData;
    return next();
  } catch (err) {
    return next({
      log: `postController.getfilteredPosts: ERROR ${err}`,
      status: 400,
      message: { err: 'An error occurred' },
    });
  }
};

// CREATE NEW POST
postController.createPost = async (req, res, next) => {
  console.log('entered postController.createPost');
  console.log('body', req.body);
  console.log('file', req.file);
  const {
    userID, preference, description, hypes, vibes,
  } = req.body;
  const imageURL = (req.file && req.file.path) ? req.file.path : 'https://c8.alamy.com/comp/2G3W71T/dolphins-cartoon-character-with-panda-whale-font-banner-isolated-illustration-2G3W71T.jpg';

  try {
    const postData = await Activity.create({
      userID,
      preference,
      image: imageURL,
      description,
      hypes,
      vibes,
    });
    res.locals.newPost = postData;
    console.log('res.locals.newPost: ', res.locals.newPost);
    return next();
  } catch (err) {
    return next({
      log: `postController.createPost: ERROR ${err}`,
      status: 400,
      message: { err: 'An error occurred' },
    });
  }
};

// UPDATE POST
postController.updatePost = async (req, res, next) => {
  const { id } = req.params;
  // TODO: We might need a separate update controller for comments
  const { preference, image, description } = req.body;
  const filter = { _id: id };
  const update = { preference, image, description };

  try {
    const updatedPostData = await Activity.findOneAndUpdate(filter, update, {
      returnNewDocument: true,
    });
    res.locals.updatedPost = updatedPostData;
    return next();
  } catch (err) {
    return next({
      log: `postController.updatePost: ERROR ${err}`,
      status: 400,
      message: { err: 'An error occurred' },
    });
  }
};

// DELETE POST
postController.deletePost = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedPostData = await Activity.findOneAndDelete({ _id: id });
    res.locals.deletedPost = deletedPostData;
    return next();
  } catch (err) {
    return next({
      log: `postController.updatePost: ERROR ${err}`,
      status: 400,
      message: { err: 'An error occurred' },
    });
  }
};

postController.likePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const liked = await Activity.findOneAndUpdate(
      { _id: id },
      { $inc: { likes: 1 } },
      { new: true },
    );
    res.locals.updatedPost = liked;
    return next();
  } catch (error) {
    return next({ err: error });
  }
};

postController.comment = async (req, res, next) => {
  try {
    console.log('adding comment');
    const { postID, username, comment } = req.body;
    const post = await Activity.findOne({ _id: postID });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    post.comments.push({ username, comment });
    console.log(post);
    console.log('added');
    await post.save();
    return next();
  } catch (err) {
    console.error(err);
    res.status(400).json('Cannot add comment');
  }
};



module.exports = postController;
