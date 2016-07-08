'use strict';
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const frenchieRouter = require('./routes/frenchieRouter.js');
const dogWalkerRouter = require('./routes/dogWalkerRouter.js');
const dbPort = process.env.MONGOLAB_URI || 'mongodb://localhost/dev_db';

mongoose.connect(dbPort);

app.use(cors());
app.use('/frenchie', frenchieRouter);
app.use('/dogwalkers', dogWalkerRouter);
app.use((err,req,res,next) => {
  res.status(404).json({message:err.message});
  next(err);
});
app.listen(3000, () => console.log('listening on 3000'));
