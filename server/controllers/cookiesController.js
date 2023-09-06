const Session = require('../models/sessionModel');

const cookieController = {};

cookieController.setSSIDCookie = (req, res, next) => {
  try {
    res.cookie('SSID', res.locals.id, { httpOnly: true });
    console.log('set cookie');
    return next();
  } catch (err) {
    console.log(err);
    return res.status(400).json('cannot set cookie');
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
    if (!req.cookies.SSID) res.redirect('/');
    const cookieId = req.cookies.SSID;
    const response = await Session.findOne({ cookieId });
    if (!response) res.redirect('/');
    return next();
  } catch (err) {
    console.log(err);
    return res.status(400).json('Cannot Verify Session');
  }
};

module.exports = cookieController;
