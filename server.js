require('dotenv').config();
const express=require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const authRouts = require('./routes/auth');
const messageRouts = require('./routes/message')
const port=process.env.PORT||3000;

const app=express();


app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

  app.use('/auth',authRouts);
  app.use('/message',messageRouts)






  const dbOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  };
  mongoose.connect(process.env.MONGO_URL, dbOptions).then(result=>{
    console.log('connected To mongodb ...');
   const server= app.listen(port);
   const io=require('./socketIo').init(server);
   io.on('connection',socket=>{
     console.log('socket')
   })

  })
