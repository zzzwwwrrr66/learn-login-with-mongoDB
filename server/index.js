const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// bodyParser -> 클라이언트에서 오는 정보를 서버에서 분석해서 가져올수있게 해주는것
const {auth} = require('./middleware/auth');
const {User} = require('./models/User');
const {Test} = require('./models/Test');
const {mongoDbUrl} = require('./config/key');

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// application/json
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose');
mongoose.connect(mongoDbUrl, {
  useNewUrlParser: true, useUnifiedTopology: true, 
})
.then(()=>{
  console.log('mongoDB connect');
})
.catch((err)=>{ 
  console.log(err);
  console.log('error');
});

app.get('/', (req, res) => res.send('hello world with wooram node'));

app.listen(port, () => console.log(`wooram node FIRST TIME AND PORT IS ${port}`));

app.post('/api/users/ragister', (req, res) => {
  // 회원가입시 필요한 정보를 클라이언트에서 가져오면 
  // 그것들을 데이터 베이스에 넣어준다.
  const user = new User(req.body); // req.body 는 bodyParser의 역할
  user.save((err, userInfo)=>{
    if(err) return res.json({success: false, err});

    console.log('succes!',userInfo);
    return res.status(200).json({
      success: true
    })
  });
});

app.post('/test02', (req, res) => {
  const test = new Test(req.body);
  test.save((err, testInfo)=>{
    if(err) return res.json({success: false, err});

    console.log('succes!',testInfo);
    return res.status(200).json({
      success: true
    })
  });
});

app.post('/api/users/login', (req, res) => {

  // console.log('ping')
  //요청된 이메일을 데이터베이스에서 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {

    // console.log('user', user)
    if (!user) {
      return res.json({
        loginSuccess: false,
        massage: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }

    //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인.
    user.comparePassword(req.body.password, (err, isMatch) => {
      // console.log('err',err)

      // console.log('isMatch',isMatch)

      if (!isMatch)
        return res.json({ loginSuccess: false, massage: "비밀번호가 틀렸습니다." })

      //비밀번호 까지 맞다면 토큰을 생성하기.
      user.getToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 토큰을 저장한다.  어디에 ?  쿠키 , 로컳스토리지 
        res.cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id })
      });
    });
  });
});

app.get('/api/users/auth', auth, (req, res)=> {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true, // 0-> 일반유저, 아니면 관리자로 설정하기도함
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  });
});

app.get('/api/users/logout', auth, (req, res) => {
  console.log(req.user)
  User.findOneAndUpdate({ _id: req.user._id }, { token: ''}, (err, user) => {
    if(err) return res.json({ success: false, err});

    return res.status(200).send({
      seccess: true
    });
  })
})


app.get('/api/hello', (req, res) => {
  res.status(200).json({
    wooram: true,
    seccess: true,
    massage: 'succes!',
  })
})



// 환경변수 process.env.NODE_ENV 
// Local 환경에서, 
// 배포한후(production) -> 호스팅한서버에서 url 정보를 저장


// Bcrypt -> 암호를 보안성 있게 변경해주는 Lib
// 


/*
{
  "name": "wooram",
  "email": "wooram@gmail.com",
  "password": "1234567"
}
*/