module.exports = function(app){
  require('./formDirective.js')(app);
  require('./listDirective.js')(app);
};
