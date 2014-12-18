'use strict';
require('angular/angular');
require('angular-route');
require('angular-cookies');
require('angular-base64');

var involveApp = angular.module('involveApp', ['ngRoute', 'ngCookies', 'base64']);

//services
// require('./services/auth_service')(involveApp);
require('./events/services/resource_backend_service')(involveApp);
require('./user/services/user_service')(involveApp);

//controllers
require('./events/controllers/calendar_controller.js')(involveApp);
// <<<<<<< HEAD
require('./controllers/nav_controller.js')(involveApp);
require('./user/controllers/login_controller.js')(involveApp);

involveApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/login', {
    templateUrl: 'templates/login/login_template.html',
    controller: 'loginCtrl'
  })
// =======
// require('./user/controllers/login_controller.js')(involveApp);

// involveApp.config(['$routeProvider', function($routeProvider) {
//   $routeProvider
// >>>>>>> b203219dfc2c8ab46209f9bb95a300bf8e7ee241
  .when('/calendar', {
    templateUrl: 'templates/events/calendar_template.html',
    controller: 'calendCtrl'
  })
  .when('/login', {
    templateUrl: 'templates/login/login_template.html',
    controller: 'loginCtrl'
  })
  .when('/singleView', {
    templateUrl: 'templates/events/event_template.html',
    controller: 'calendCtrl'
  })
  .otherwise({
    redirectTo: '/login'
  });
}]);
