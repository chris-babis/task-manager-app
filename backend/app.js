const mongoose = require('mongoose');
const express = require('express');
const User = require('./routers/User');
const Project = require('./routers/Project');
const Task = require('./routers/Task');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/task-manager-db',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, Access-Control-Allow-Headers, Authorization, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

app.use(User);
app.use(Project);
app.use(Task);

app.listen(PORT, console.log(`Server up running...\nPORT: ${PORT}`));