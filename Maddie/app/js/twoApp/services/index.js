module.exports = function(app){
  require('./errorService.js')(app);
  require('./AuthService.js')(app);
};
