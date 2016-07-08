'use strict';
module.exports = function(app){
  app.config(['$routeProvider', function($route) {
    $route.when('/', {
      templateUrl:'./templates/partials/frenchie.html',
      controller:'FrenchieController',
      controllerAs:'frenchiectrl'
    })
  .when('/dogwalkers', {
    templateUrl:'./templates/partials/dogWalker.html',
    controller:'DogwalkerController',
    controllerAs:'dogwalkerctrl'
  })
  .when('/signin', {
    templateUrl:'./templates/partials/signIn.html',
    controller:'SignInController',
    controllerAs:'signinctrl'
  })
  .when('/signup', {
    templateUrl:'./templates/partials/signUp.html',
    controller:'SignInController',
    controllerAs:'signinctrl'
  });
  }]);
};
