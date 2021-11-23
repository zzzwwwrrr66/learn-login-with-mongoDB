const express = require('express');
const app = express();
const port = 5000;

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://wooram02:abcd1234@cluster0.tvxas.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true, useUnifiedTopology: true, 
})
.then(()=>{
  console.log('monoDB connect');
})
.catch((err)=>{ 
  console.log(err);
  console.log('error');
})



app.get('/', (req, res) => res.send('hello world'));

app.listen(port, () => console.log(`haha first node ${port}`))
