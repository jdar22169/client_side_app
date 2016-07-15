module.exports = function(app) {
  app.directive('itemDirective', function() {
    return {
      templateUrl:'./templates/itemTemplate.html',
      scope: {
        type:'@',
        animal:'='
      },
      require:'^^ngController',
      link: function($scope) {
        $scope.death = $scope.type === 'Frenchies' ? 'dogWalkers_bitten' : 'dogs_died';
      }
    };
  });
};
