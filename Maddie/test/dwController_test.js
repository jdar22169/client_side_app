// 'use strict';
//
// const angular = require('angular');
// require('angular-mocks');
// require('../app/js/client.js');
//
// describe('dogwalker controller tests', () => {
//   let dwCtrl;
//   let $httpBackend;
//
//   beforeEach(() => {
//     angular.mock.module('twoCRUDApp');
//     angular.mock.inject(function($controller, _$httpBackend_) {
//       dwCtrl = new $controller('DogwalkerController');
//       $httpBackend = _$httpBackend_;
//     });
//   });
//
//   afterEach(() => {
//     $httpBackend.verifyNoOutstandingRequest();
//     $httpBackend.verifyNoOutstandingExpectation();
//   });
//
//   it('should get a list of dogwalkers', () => {
//     $httpBackend.expectGET('http://localhost:3000/dogwalkers')
//     .respond(200, {dogwalkers: [{name: 'test'}]});
//     dwCtrl.getDW();
//     $httpBackend.flush();
//     expect(dwCtrl.dogwalkers[0].name).toBe('test');
//   });
//
//   it('should post a new dogwalker', ()=>  {
//     $httpBackend.expectPOST('http://localhost:3000/dogwalkers')
//     .respond(200, {name: 'testy'});
//     dwCtrl.newDW = {name:'testy'};
//     dwCtrl.addDW();
//     $httpBackend.flush();
//     expect(dwCtrl.newDW).toBe(null);
//     expect(dwCtrl.dogwalkers[0].name).toBe('testy');
//   });
//
//   it('should delete a dogwalker', () => {
//     let testDW = {name: 'larry', _id: 1};
//     $httpBackend.expectDELETE('http://localhost:3000/dogwalkers/1')
//     .respond(200);
//     dwCtrl.dogwalkers.push(testDW);
//     dwCtrl.deleteDW(testDW);
//     $httpBackend.flush();
//     expect(dwCtrl.dogwalkers.length).toBe(0);
//   });
//
//   it('should update a dogwalker', () => {
//     let testDW = {name: 'testy', _id:1};
//     let updatedDW = {name:'god'};
//     $httpBackend.expectPUT('http://localhost:3000/dogwalkers')
//     .respond(200);
//     dwCtrl.dogwalkers.push(testDW);
//     dwCtrl.updateDW(testDW, updatedDW);
//     $httpBackend.flush();
//     expect(dwCtrl.dogwalkers[0].name).toBe('god');
//     expect(dwCtrl.dogwalkers[0]._id).toBe(1);
//   });
// });
