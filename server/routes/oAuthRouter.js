const express = require('express');
const oAuthController = require('../controllers/oAuthController');
const cookieController = require('../controllers/cookiesController');

const oAuthRouter = express.Router();

oAuthRouter.post(
  '/signup',
  oAuthController.signUp,
  cookieController.setUsername,
  cookieController.setSSIDCookie,
  cookieController.setSession,
  (req, res) => {
    res.status(200).json('Sign Up Successful');
  },
);

oAuthRouter.post(
  '/login',
  oAuthController.logIn,
  cookieController.setUsername,
  cookieController.setSSIDCookie,
  cookieController.setSession,
  (req, res) => {
    res.status(200).json('Login Successful');
  },
);

oAuthRouter.use(
  '/',
  cookieController.verifySession,
  (req, res) => res.redirect('/app'),
);

module.exports = oAuthRouter;
