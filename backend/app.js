const mongoose = require('mongoose');
const express = require('express');
const User = require('./routers/User');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/task-manager-db',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, Access-Control-Allow-Headers, Authorization, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

app.use(User);

app.listen(PORT, console.log(`Server up running...\nPORT: ${PORT}`));