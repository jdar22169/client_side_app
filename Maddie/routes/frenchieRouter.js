'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const jwtAuth = require('../lib/authToken.js');
const Frenchie = require('../schema/frenchies.js');

const frenchieRouter = module.exports = express.Router();

frenchieRouter.post('/', jwtAuth, jsonParser, (req,res,next) => {
  console.log('hit post route');
  let newFrenchie = new Frenchie(req.body);
  newFrenchie.save((err,frenchie) => {
    if (err) next(err);
    res.json(frenchie);
  });

});

frenchieRouter.get('/', (req,res) => {
  //console.log('hit get route');
  Frenchie.find({}, (err,data) => {
    if(err) return res.json({message:err.message});
    res.json({frenchie: data});
  });
});


frenchieRouter.put('/', jwtAuth, jsonParser, (req,res) => {
  console.log('hit the put route');
  Frenchie.findOneAndUpdate({_id:req.body._id}, req.body, (err,data) => {
    if(err) return res.json({message: err.message});
    res.json({message:'successfully updated Frenchie', oldDog: data});
  });
});

frenchieRouter.delete('/:frenchie_id', jwtAuth, (req,res) => {
  console.log('hit the delete route');
  Frenchie.findOneAndRemove({_id:req.params.frenchie_id}, null, (err,data) => {
    if(err) return res.json({message:err.message});
    res.json({message:'Deleted Frenchie', oldDog:data});
  });
});
