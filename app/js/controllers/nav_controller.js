'use strict';

module.exports = function(app) {
  app.controller('navCtrl', ['$scope', '$http', '$cookies', '$location', '$rootScope', 'userService', function($scope, $http, $cookies, $location, $rootScope, userService) {

    $scope.loggedIn = false;

    $scope.$on('user:loggedIn', function(event, data) {
      $scope.loggedIn = true;
    });

    $scope.$on('user:loggedOut', function(event, data) {
      $scope.loggedIn = false;
    });

    $scope.calendar = function() {
      $location.path('/calendar');
    };

    $scope.favorites = function() {
      $location.path('/favorites');
    };

    $scope.logout = function() {
      $location.path('/login');
      userService.logout();

    };

  }]);
};
