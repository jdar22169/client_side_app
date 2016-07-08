module.exports = function(app){
  app.controller('SignInController', function($location, AuthService){
    this.goFrenchies = function(){
      $location.url('/');
    };
    this.goDW = function(){
      $location.url('/dogwalkers');
    };
    this.signUp = function(user){
      AuthService.signUp(user);
    };
    this.signIn = function(user){
      AuthService.signIn(user);
    };
  });
};
