'use strict';

module.exports = function(app) {
  app.controller('loginCtrl', ['$scope', '$http', '$cookies', '$base64', '$location', 'userService', function($scope, $http, $cookies, $base64, $location, $userService) {

    $scope.errors = [];

    $scope.login = function() {
      $scope.errors = [];

      $userService.login($scope.user)
      .success(function(data) {
        $cookies.jwt = data.jwt;
        $location.path('/calendar');
      })
      .error(function(data) {
        $scope.errors.push(data);
      });
    };

    $scope.signUp = function() {
      $scope.errors = [];
      var newUser = $scope.newUser;

      $userService.signUp($scope.newUser)
      .success(function(data) {
        $cookies.jwt = data.jwt;
        $location.path('/calendar');
      })
      .error(function(data) {
        $scope.errors.push(data);
      });
    };
  }]);
};
