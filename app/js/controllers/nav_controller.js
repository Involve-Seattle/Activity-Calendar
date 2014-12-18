'use strict';

module.exports = function(app) {
  app.controller('navCtrl', ['$scope', '$http', '$cookies', '$location', '$rootScope', 'userService', function($scope, $http, $cookies, $location, $rootScope, userService) {
    console.log($scope.loggedIn);
    if (!$cookies.jwt || !$cookies.jwt.length) {
      console.log('whhatt?!');
      $scope.loggedIn = false;
    } else {
      $scope.loggedIn = true;
    }
    console.log($scope.loggedIn);

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
      userService.logout();
    };

  }]);
};
