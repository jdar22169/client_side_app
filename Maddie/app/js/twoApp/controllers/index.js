module.exports = function(app){
  require('./DogWalkerController.js')(app);
  require('./FrenchieController.js')(app);
};
