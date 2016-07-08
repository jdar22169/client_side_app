'use strict';

const jwt = require('jsonwebtoken');
const User = require('../schema/users.js');
const secret = process.env.SECRET || 'changeme';

module.exports = function(req,res,next) {
  let token = req.headers.token;
  let tokenErr = new Error('Authorization failed');
  let decodeErr = new Error('Decode failed');
  let userErr = new Error(' No user');
  let decodedToken;

  if(!token) return next(tokenErr);

  try{
    decodedToken = jwt.verify(token,secret);
  } catch(e){
    return next(decodeErr);
  }

  User.findOne({_id:decodedToken._id}, (err,user) => {
    if(!user || err) return next(userErr);
    req.username = user.username;
    next();
  });
};
