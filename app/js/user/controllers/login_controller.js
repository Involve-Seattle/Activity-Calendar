'use strict';

module.exports = function(app) {
  app.controller('loginCtrl', ['$scope', '$http', '$cookies', '$base64', '$location', 'userService', function($scope, $http, $cookies, $base64, $location, userService) {

    $scope.errors = [];

    $scope.login = function() {
      $scope.errors = [];

      userService.login($scope.user)
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
      if (newUser.password !== newUser.passwordConfirmation || newUser.password === undefined) {
        return ({msg: 'password and confirmation did not match'});
      }
      if (!newUser.email) {
        return ({msg: 'did not specify an email'});
      }
      if (newUser.password !== newUser.passwordConfirmation) return ({msg: 'password and confirmation did not match'});
      if (!newUser.email) return ({msg: 'did not specify an email'});
      if (!newUser.password) return ({msg: 'did not specify a password'});

      if ($scope.errors.length) return;

      userService.signUp($scope.newUser)

      .error(function(data) {
        $scope.errors.push(data);
      });

    };
  }]);
};
