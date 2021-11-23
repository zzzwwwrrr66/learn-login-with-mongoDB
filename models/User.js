const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    maxlength: 50
  },
  role: { // 관리자
    type: Number,
    default: 0
  },
  image: String,
  token: { //유효성 관리
    typw: String
  },
  tokenExp: { // 유효기간
    type: Number
  }
});

const User = mongoose.model('User', userSchema);

module.exports = {User}