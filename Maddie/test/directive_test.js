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
    $scope.test = 'Test title';
    $scope.animals = {
      frenchies: [{
        name:'test'
      }, {
        name: 'test2'
      }, {
        name:'test3'
      }]
    };
    let link = $compile('<list-directive type="{{test}}" animals="animals.frenchies"></list-directive');
    let directive = link($scope);
    $scope.$digest();
    $httpBackend.flush();

    let list = directive.find('item-directive');
    let list_title = directive.find('h1');

    expect(list.length).toBe(3);
    expect(list_title).toBe('Test title');
  });
});
