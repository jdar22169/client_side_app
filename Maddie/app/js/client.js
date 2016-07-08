'use strict';

const angular = require('angular');
const ngRoute = require('angular-route');

const app = angular.module('twoCRUDApp', [ngRoute]);
require('./twoApp')(app);
require('./router.js')(app);
