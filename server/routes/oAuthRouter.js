const express = require('express');
const oAuthController = require('../controllers/oAuthController');
const cookieController = require('../controllers/cookiesController');

const oAuthRouter = express.Router();

oAuthRouter.post(
  '/signup',
  oAuthController.signUp,
  cookieController.setSSIDCookie,
  cookieController.setSession,
  (req, res) => {
    res.status(200).json('Sign Up Successful');
  },
);

oAuthController.post(
  '/login',
  oAuthController.logIn,
  cookieController.setSSIDCookie,
  cookieController.setSession,
  (req, res) => {
    res.status(200).json('Login Successful');
  },
);

module.exports = oAuthRouter;
