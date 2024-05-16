// backend/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: String,
  passwordHash: String,
});

module.exports = mongoose.model('User', UserSchema);
