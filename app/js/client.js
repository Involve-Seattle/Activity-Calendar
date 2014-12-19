'use strict';
require('angular/angular');
require('angular-route');
require('angular-cookies');
require('angular-base64');

var involveApp = angular.module('involveApp', ['ngRoute', 'ngCookies', 'base64']);

//directives
require('./directives/header_directive.js')(involveApp);

//services
require('./user/services/user_service')(involveApp);
require('./events/services/resource_backend_service')(involveApp);

//controllers
require('./controllers/index_controller.js')(involveApp);
require('./user/controllers/login_controller.js')(involveApp);
require('./events/controllers/calendar_controller.js')(involveApp);
require('./mymeetings/controllers/mymeetings_controller.js')(involveApp);

involveApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/login', {
    templateUrl: 'templates/login/login_template.html',
    controller: 'loginCtrl'
  })
  .when('/calendar', {
    templateUrl: 'templates/events/calendar_template.html',
    controller: 'calendCtrl'
  })
  .when('/singleView', {
    templateUrl: 'templates/events/event_template.html',
    controller: 'calendCtrl'
  })
  .when('/mymeetings', {
    templateUrl: 'templates/mymeetings/mymeetings_template.html',
    controller: 'mymeetCtrl'
  })
  .otherwise({
    redirectTo: '/login'
  });
}]);
