const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
const tasksRouter = require('./routes/tasks');
const authRouter = require('./routes/auth');

// const { verifyUser } = require("./routes/middlewares");

  // Connecting to the database   
    const connect = mongoose.connect(process.env.mongoDBURL);
    connect
      .then(() => {
        console.log("connected succesfully to datebase");
      })
      .catch((error) => {
        console.log("could not connect to the database reason = ", error);
      });
app.use(express.json());

app.use('/tasks', tasksRouter);    
app.use('/auth', authRouter);

app.listen(port, function () {
  console.log("listening to port", port);  
 }); 
 


