'use strict';
module.exports = function(app){
  app.directive('formDirective', function() {
    return {
      templateUrl:'./templates/formTemplate.html',
      scope:{
        type:'@',
        resource: '@',//resource for config
        animal:'='//attribute for animal---dogwalker vs frenchie
      },
      require: '^^ngController',
      link: function($scope, elem, attr, controller) {
        let configMethods = {
          frenchies: function($scope) {
            $scope.delete = controller.deleteFrenchies;
            $scope.submit = $scope.type === 'new' ? controller.addFrenchies : controller.updateFrenchies;
          },
          dogwalkers: function($scope) {
            $scope.delete = controller.deleteDW;
            $scope.submit= $scope.type === 'new' ? controller.addDW : controller.updateDW;
          }
        };
        configMethods[$scope.resource]($scope);
      }
    };
  });
};
