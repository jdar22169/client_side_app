module.exports = function(app){
  app.controller('DogwalkerController', function($http, $location, AuthService, ErrorService){
    this.$http = $http;
    this.dogwalkers = [];

    this.getDW = function() {
      this.$http.get('http://localhost:3000/dogwalkers')
      .then((res) => {
        this.dogwalkers = res.data.dogwalkers;
      }, ErrorService.errorMessage('Error in Dogwalker GET'));
    };

    this.addDW = function(dogwalker) {
      $http({
        method: 'POST',
        data: dogwalker,
        url: 'http://localhost:3000/dogwalkers',
        headers: {
          token: AuthService.getToken()
        }
      })
      .then((res) => {
        this.dogwalkers.push(res.data);
      }, (err) => {
        $location.url('/signin');
        console.log(err);
      });
    }.bind(this);

    this.deleteDW = function(dogwalker) {
      this.$http.delete('http://localhost:3000/dogwalkers/' + dogwalker._id)
      .then(() => {
        let index = this.dogwalkers.indexOf(dogwalker);
        this.dogwalkers.splice(index, 1);
      }, ErrorService.errorMessage('Error in Dogwalker DELETE'));
    }.bind(this);

    this.updateDW = function(dogwalker) {
      this.$http.put('http://localhost:3000/dogwalkers', dogwalker)
      .then(() => {
        this.dogwalkers = this.dogwalkers.map(ndw => {
          return ndw._id === dogwalker._id ? dogwalker : ndw;
        });
      }, ErrorService.errorMessage('Error in Dogwalker PUT'));
    }.bind(this);

    this.goFrenchie = function() {
      $location.url('/');
    };
  });
};
