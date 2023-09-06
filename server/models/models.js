const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const path = require('path');
require('dotenv').config();

const saltFactor = 10;

const MONGO_URI = 'mongodb+srv://justinchu24:FcIEdxYQZlrj6qt5@cluster0.u1qlvgx.mongodb.net/?retryWrites=true&w=majority';
console.log('DB_URI from env: ', process.env.DB_URI);

mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'get-swell',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  email: { type: String, required: true},
  preferences: {
    type: Object,
    default: {
      motivation: true,
      milestones: true,
      mindfulness: true,
    },
  },
});

userSchema.pre('save', async function (next) {
  try {
    const salt = 15;
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;

    return next();
  } catch (err) {
    return next(err);
  }
});

const User = mongoose.model('User', userSchema);

const activitySchema = new Schema(
  {
    userID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    preference: { type: String, required: true },
    image: String,
    description: { type: String, required: true },
    likes: { type: Number, default: 0 },
    comments: Array,
  },
  { timestamps: true },
);

const Activity = mongoose.model('Activity', activitySchema);

const commentSchema = new Schema(
  {
    userName: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true },
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = {
  User,
  Activity,
  Comment,
};
