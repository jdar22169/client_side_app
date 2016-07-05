module.exports = function(app) {
  app.controller('FrenchieController', function($http, ErrorService){
    this.$http = $http;
    this.frenchies = [];

    this.getFrenchies = function() {
      this.$http.get('http://localhost:3000/frenchie')
      .then((res) => {
        this.frenchies = res.data.frenchie;
      }, ErrorService.errorMessage('Error in Frenchie GET'));
    };

    this.addFrenchies = function(frenchie) {
      this.$http.post('http://localhost:3000/frenchie', frenchie)
      .then((res) => {
        this.frenchies.push(res.data);
      }, ErrorService.errorMessage('Error in Frenchie POST'));
    }.bind(this);

    this.deleteFrenchies = function(frenchie) {
      this.$http.delete('http://localhost:3000/frenchie/' + frenchie._id)
      .then(() => {
        console.log('delete prototype');
        let index = this.frenchies.indexOf(frenchie);
        this.frenchies.splice(index, 1);
      }, ErrorService.errorMessage('Error in Frenchie DELETE'));
    }.bind(this);

    this.updateFrenchies = function(frenchie) {
      this.$http.put('http://localhost:3000/frenchie', frenchie)
      .then(() => {
        this.frenchies = this.frenchies.map(nf => {
          return nf._id === frenchie._id ? frenchie : nf;
        });
      }, ErrorService.errorMessage('Error in Frenchie PUT'));
    }.bind(this);
  });
};
