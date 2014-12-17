'use strict';

module.exports = function(app) {
  app.controller('loginCtrl', ['$scope', '$http', '$cookies', '$base64', '$location', 'userService', function($scope, $http, $cookies, $base64, $location, $userService) {

    $scope.errors = [];

    $scope.login = function() {
      $scope.errors = [];

      var user = {};
      user.email = $scope.user.email;
      user.password = $scope.user.password;

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
      if ($scope.newUser.password !== $scope.newUser.passwordConfirmation) $scope.errors.push({msg: 'password and confirmation did not match'});
      if (!$scope.newUser.email) $scope.errors.push({msg: 'did not specify an email'});
      if ($scope.errors.length) return;

      $scope.newUser.email = $base64.encode($scope.newUser.email);
      $scope.newUser.password = $base64.encode($scope.newUser.password);

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
