const bcrypt = require('bcrypt');
const { User } = require('../models/models');

const oAuthController = {};

oAuthController.signUp = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const response = await User.create({ username, password, email });
    res.locals.id = response._id.toString();
    console.log('Added User', response);
    return next();
  } catch (err) {
    console.log(err);
    return res.status(400).json('Username or password invalid');
  }
};

oAuthController.logIn = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const response = bcrypt.compare(password, user.password);
    if (!response) res.status(400).json('Invalid Credentials');
    res.locals.id = user._id.toString();
    console.log('Verified Credentials');
    return next();
  } catch (err) {
    console.log(err);
    return res.status(400).json('Username or Password invalid');
  }
};

module.exports = oAuthController;
