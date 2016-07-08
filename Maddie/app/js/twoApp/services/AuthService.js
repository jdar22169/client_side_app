'use strict';
module.exports = function(app){
  app.factory('AuthService', function($http){
    let token;
    const service = {};

    service.signUp = function(user){
      return $http.post('http://localhost:3000/signup', user)
      .then((res) => {
        token = res.data.token;
        return res;
      });
    };

    service.signIn = function(user){
      let base64Auth = btoa(user.username + ':' + user.password);
      let authString = 'Basic ' + base64Auth;
      return $http({
        method: 'POST',
        url: 'http://localhost:3000/signin',
        headers: {
          authorization: authString
        }
      })
      .then((res) => {
        token = res.data.token;
        console.log('signin', res);
        console.log('signin token', token);
        return res;
      });
    };

    service.getToken = function(){
      return token;
    };
    return service;
  });
};
