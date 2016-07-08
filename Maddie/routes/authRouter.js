'use strict';

const express = require('express');
const bodyParser = require('body-parser').json();
const User = require('../schema/user.js');
const basicHTTP = require('./lib/basic_http.js');


const authRouter = module.exports = exports = express.Router();

authRouter.post('/signup', bodyParser, (req,res,next) => {
  let newUser = new User(req.body);
  newUser.password = newUser.hashPassword();
  req.body.password = null;
  User.findOne({username:req.body.username}, (err,user) => {
    if(err || user) return next( new Error('User exists'));
    newUser.save((err,user) => {
      if(err) return next(new Error('could not save user'));
      res.json({token:user.generateToken(), user: user.username});
    });
  });
});

authRouter.post('/signin', basicHTTP, (req,res,next) => {
  User.findONe({username:req.auth.username}, (err,user) => {
    if(err || !user) return next(new Error('Authentication Error'));
    if(!user.comparePassword(req.auth.password)) return next(new Error('Password does not match'));
    res.json({token:user.generateToken()});
  });
});
