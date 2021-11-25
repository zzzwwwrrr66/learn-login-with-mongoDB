// 컬랙션 생성!!!

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const userSchema = mongoose.Schema({
  name: {
      type: String,
      maxlength: 50
  },
  email: {
      type: String,
      trim: true,
      unique: 1
  },
  password: {
      type: String,
      minlength: 5
  },
  lastname: {
      type: String,
      maxlength: 50
  },
  role: {
      type: Number,
      default: 0
  },
  image: String,
  token: {
      type: String
  },
  tokenExp: {
      type: Number
  }
});


userSchema.pre('save', function(next){// user.save 하기전에 할 동작
  var _self = this;

  if(_self.isModified('password')) { // password가 변환될때만 아래 실행
    bcrypt.genSalt(saltRounds, function(err, salt){// password 암호화 Salt 사용 -> saltRounds = 자리수 -> Salt를 이용해서 비밀번호를 암호화
      if(err) return next(err);
      bcrypt.hash(_self.password, salt, function(err, hash){
        if(err) return next(err);
  
        _self.password = hash;
        next();
      });
    });
    
  } else { // password 값 외의 동작
    next();
  }
});

userSchema.methods.comparePassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if(err) return cb(err);

    cb(null, isMatch);
  });
}

userSchema.methods.getToken = function (cb) {
  var user = this;
  // console.log('user._id', user._id)

  // jsonwebtoken을 이용해서 token을 생성하기 
  var token = jwt.sign(user._id.toHexString(), 'secretToken')
  // user._id + 'secretToken' = token 
  // -> 
  // 'secretToken' -> user._id

  user.token = token
  user.save(function (err, user) {
      if (err) {
        console.log('save token err')
        return cb(err)
      }
      cb(null, user)
  })
}

userSchema.statics.findByToken = function(token, cb) {
  var user = this;
  // user._id + ''  = token
  //토큰을 decode 한다. 
  jwt.verify(token, 'secretToken', function (err, decoded) {
      //유저 아이디를 이용해서 유저를 찾은 다음에 
      //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
      user.findOne({ "_id": decoded, "token": token }, function (err, user) {
          if (err) return cb(err);
          cb(null, user)
      })
  })
}


const User = mongoose.model('User', userSchema);

module.exports = {User}