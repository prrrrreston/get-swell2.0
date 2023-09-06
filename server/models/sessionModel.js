const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  cookieId: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: 10000, default: Date.now },
});
const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;
