const Session = require('../models/sessionModel');

const cookieController = {};

cookieController.setUsername = async (req, res, next) => {
  try {
    res.cookie('username', res.locals.username);
    console.log('set username cookie');
    return next();
  } catch (err) {
    return res.status(400).json('cannot set username cookie');
  }
};
cookieController.setSSIDCookie = (req, res, next) => {
  try {
    res.cookie('SSID', res.locals.id, { httpOnly: true });
    console.log('set SSID cookie');
    return next();
  } catch (err) {
    console.log(err);
    return res.status(400).json('cannot set SSID cookie');
  }
};

cookieController.setSession = async (req, res, next) => {
  try {
    const created = await Session.findOne({ cookieId: res.locals.id });
    if (created) return next();
    const response = await Session.create({ cookieId: res.locals.id });
    console.log('created session');
    return next();
  } catch (err) {
    console.log(err);
    return res.status(400).json('cannot set session');
  }
};

cookieController.verifySession = async (req, res, next) => {
  try {
    console.log('verifying SSID');
    if (!req.cookies.SSID) return res.redirect('/');
    const cookieId = req.cookies.SSID;
    const response = await Session.findOne({ cookieId });
    if (!response) return res.redirect('/');
    return next();
  } catch (err) {
    console.log(err);
    return res.status(400).json('Cannot Verify Session');
  }
};

module.exports = cookieController;
