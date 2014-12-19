'use strict';

module.exports = function(app) {
  app.controller('indexCtrl', ['$scope', '$http', '$cookies', '$location', '$rootScope', 'userService', function($scope, $http, $cookies, $location, $rootScope, userService) {

    if (!$cookies.jwt || !$cookies.jwt.length) {
      $scope.loggedIn = false;
    } else {
      $scope.loggedIn = true;
    }

    $scope.$on('user:loggedIn', function(event, data) {
      $scope.loggedIn = true;
    });

    $scope.$on('user:loggedOut', function(event, data) {
      $scope.loggedIn = false;
    });

  }]);
};
