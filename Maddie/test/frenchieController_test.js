'use strict';

const angular = require('angular');
require('angular-mocks');
require('../app/js/client.js');

describe('frenchie controller tests', () => {
  let frenchieCtrl;
  let $httpBackend;

  beforeEach(() => {
    angular.mock.module('twoCRUDApp');
    angular.mock.inject(function($controller, _$httpBackend_) {
      frenchieCtrl = new $controller('FrenchieController');
      $httpBackend = _$httpBackend_;
    });
  });
  afterEach(() => {
    $httpBackend.verifyNoOutstandingRequest();
    $httpBackend.verifyNoOutstandingExpectation();
  });
  it('should get a list of frenchies', () => {
    $httpBackend.expectGET('http://localhost:3000/frenchie')
    .respond(200, {frenchie: [{name:'larry'}]});
    frenchieCtrl.getFrenchies();
    $httpBackend.flush();
    expect(frenchieCtrl.frenchies[0].name).toBe('larry');
  });
  it('should post a new frenchie', () => {
    $httpBackend.expectPOST('http://localhost:3000/frenchie')
    .respond(200, {name:'test'});
    frenchieCtrl.addFrenchies();
    $httpBackend.flush();
    expect(frenchieCtrl.frenchies[0].name).toBe('test');
  });
  it('should delete a frenchie', () => {
    let testFrenchie = {name:'testy', _id:1};
    $httpBackend.expectDELETE('http://localhost:3000/frenchie/1')
    .respond(200);
    frenchieCtrl.frenchies.push(testFrenchie);
    frenchieCtrl.deleteFrenchies(testFrenchie);
    $httpBackend.flush();
    expect(frenchieCtrl.frenchies.length).toBe(0);
  });
  it('should update a frenchie', () => {
    let testFrenchie = {name:'testy', _id:1};
    let updatedFrenchie = {_id:1,name:'frog'};
    $httpBackend.expectPUT('http://localhost:3000/frenchie')
    .respond(200);
    frenchieCtrl.frenchies.push(testFrenchie);
    frenchieCtrl.updateFrenchies(updatedFrenchie);
    $httpBackend.flush();
    expect(frenchieCtrl.frenchies[0].name).toBe('frog');
    expect(frenchieCtrl.frenchies.length).toBe(1);
  });
});
