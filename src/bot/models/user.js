const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  telegramId: {
    type: Number,
    required: true,
    unique: true,
  },
  first_name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  username: {
    type: String,
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
