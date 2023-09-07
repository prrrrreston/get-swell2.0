const { User } = require('../models/models.js');

const userController = {};

// GET - single user with all data except password
userController.getUser = async (req, res, next) => {
  const { username } = req.query;
  try {
    const fetchedUser = await User.findOne({ username });
    res.locals.user = fetchedUser;
    console.log('userController.getUser fetched user:', fetchedUser);
    return next();
  } catch (error) {
    return next({
      log: `userController.getUser caught error: ${error}`,
      message: { err: 'See server log for details' },
    });
  }
};

// POST - add new user
userController.createUser = async (req, res, next) => {
  const { userName } = req.query;
  const {
    password, email, preferences, zipCode,
  } = req.body;
  try {
    console.log(userName, password);
    const newUser = await User.create({
      userName,
      password,
      email,
      preferences,
      zipCode,
    });
    res.locals.newUser = newUser;
    console.log('userController.createUser created:', newUser);
    return next();
  } catch (error) {
    return next({
      log: `userController.createUser caught error: ${error}`,
      message: { err: 'See server log for details' },
    });
  }
};

userController.updateUser = async (req, res, next) => {
  const { userName } = req.query;
  try {
    const filter = { userName };
    const update = req.body;
    const updatedUser = await User.findOneAndUpdate(filter, update, {
      new: true,
    });
    res.locals.updatedUser = updatedUser;
    console.log('userController.updateUser updated:', updatedUser);
    return next();
  } catch (error) {
    return next({
      log: `userController.updateUser caught error: ${error}`,
      message: { err: 'See server log for details' },
    });
  }
};

userController.deleteUser = async (req, res, next) => {
  const { userName } = req.query;
  try {
    const deletedUser = await User.findOneAndDelete({ userName });
    res.locals.deletedUser = deletedUser;
    console.log('userController.deleteUser deleted:', deletedUser);
    return next();
  } catch (error) {
    return next({
      log: `userController.deleteUser caught error: ${error}`,
      message: { err: 'See server log for details' },
    });
  }
};

module.exports = userController;
