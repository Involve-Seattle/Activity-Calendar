'use strict';
require('angular/angular');
require('angular-route');
require('angular-cookies');
require('angular-base64');

var involveApp = angular.module('involveApp', ['ngRoute', 'ngCookies', 'base64']);

//services
// require('./services/resource_backend_service')(involveApp);

//controllers
require('./user/controllers/login_controller.js')(involveApp);

involveApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/template', {
    templateUrl: 'templates/login_template.html',
    controller: 'loginCtrl'
  })
  .otherwise({
    redirectTo: '/template'
  });
}]);
