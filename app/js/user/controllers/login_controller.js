'use strict';

module.exports = function(app) {
  app.controller('loginCtrl', ['$scope', '$http', '$cookies', '$base64', '$location', 'userService', function($scope, $http, $cookies, $base64, $location, userService) {

    $scope.errors = [];

    $scope.login = function() {
      $scope.errors = [];

      userService.loginService($scope.user, $cookies)
      .error(function(data) {
        $scope.errors.push(data);
      });
    };

    $scope.signUp = function() {
      $scope.errors = [];
      var newUser = $scope.newUser;
      if ($scope.errors.length) return;

      userService.signUpService(newUser, $cookies)
      .error(function(data) {
        $scope.errors.push(data);
      });
    };
  }]);
};
