'use strict';

const angular = require('angular');
require('angular-mocks');
require('../app/js/client.js');

const formTemplate = require('../app/templates/formTemplate.html');
const listTemplate = require('../app/templates/listTemplate.html');
const itemTemplate = require('../app/templates/itemTemplate.html');

describe('directive unit testing', () => {
  let $httpBackend;
  let $scope;
  let $compile;
  beforeEach(() => {
    angular.mock.module('twoCRUDApp');
    angular.mock.inject(function(_$httpBackend_, $rootScope, _$compile_ ){
      $scope = $rootScope.$new();
      $httpBackend = _$httpBackend_;
      $compile = _$compile_;
    });
  });
  it('should display title and list', () => {
    $httpBackend.expectGET('./templates/listTemplate.html')
      .respond(200, listTemplate);
    $httpBackend.expectGET('./templates/itemTemplate.html')
      .respond(200, itemTemplate);
    $httpBackend.expectGET('./templates/formTemplate.html')
      .respond(200, formTemplate);
    $scope.test = 'Frenchies';
    $scope.animals = {
      frenchies: [{
        name:'test'
      }, {
        name: 'test2'
      }, {
        name:'test3'
      }]
    };
    let element = angular.element('<list-directive type="{{test}}" animals="animals.frenchies"></list-directive');
    element.data('$ngControllerController', {});
    let link = $compile(element);
    let directive = link($scope);
    $scope.$digest();
    $httpBackend.flush();

    let list = directive.find('item-directive');
    let list_title = (directive.find('h1')).text();

    expect(list.length).toBe(3);
    expect(list_title).toBe('Frenchies');
  });

  it('should have the name and death variable depending on type of resource', () => {
    $httpBackend.expectGET('./templates/itemTemplate.html')
      .respond(200, itemTemplate);
    $httpBackend.expectGET('./templates/formTemplate.html')
      .respond(200, formTemplate);
    $scope.animals = {
      frenchies:[{
        name: 'Testy',
        dogWalkers_bitten: 10
      }]
    };
    $scope.type = 'Frenchies';

    let element = angular.element('<ul><item-directive type="{{type}}" animal="animal" ng-repeat="animal in animals.frenchies"></item-directive></ul>');
    element.data('$ngControllerController', {});
    console.log('element', element);
    let link = $compile(element);
    let directive= link($scope);
    console.log('directive',directive);
    $scope.$digest();
    $httpBackend.flush();


    let item = angular.element(directive.find('p')[2]);
    let name = (angular.element(directive.find('p')[0])).text();
    let dogWalkers_bitten = (angular.element(directive.find('p')[1])).text();


    expect((item).hasClass('ng-hide')).toBe(true);
    expect(dogWalkers_bitten).toBe('DOGWALKERS BITTEN: 10');
    expect(name).toBe('NAME: Testy');
  });

  it('should have a different form for edit vs add and resource', () => {
    $httpBackend.expectGET('./templates/formTemplate.html')
      .respond(200, formTemplate);
    $scope.resource = 'frenchies';
    $scope.form = 'edit';

    let element = angular.element('<div><form-directive resource="{{resource}}" form="{{form}}"></form-directive></div>');
    element.data('$ngControllerController', {});
    let link = $compile(element);
    let directive = link($scope);
    $scope.$digest();
    $httpBackend.flush();

    let formTitle = angular.element(directive.find('h3'));
    let formLabel = angular.element(directive.find('label')[2]);
    let deleteButton = angular.element(directive.find('button')[0]);

    expect((formTitle).hasClass('ng-hide')).toBe(true);
    expect((formLabel).hasClass('ng-hide')).toBe(true);
    expect((deleteButton).hasClass('ng-hide')).toBe(false);
  });
});
