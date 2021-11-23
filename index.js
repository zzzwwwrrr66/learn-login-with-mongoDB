const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
// bodyParser -> 클라이언트에서 오는 정보를 서버에서 분석해서 가져올수있게 해주는것
const {User} = require('./models/User')
const {mongoDbUrl} = require('./config/key');

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// application/json
app.use(bodyParser.json());

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

app.post('/register', (req, res) => {
  // 회원가입시 필요한 정보를 클라이언트에서 가져오면 
  // 그것들을 데이터 베이스에 넣어준다.
  const user = new User(req.body) // req.body 는 bodyParser의 역할

  user.save((err, userInfo)=>{
    if(err) return res.json({success: false, err});

    console.log('succes!',userInfo);
    return res.status(200).json({
      success: true
    })
  }) // 
});


// 환경변수 process.env.NODE_ENV 
// Local 환경에서, 
// 배포한후(production) -> 호스팅한서버에서 url 정보를 저장