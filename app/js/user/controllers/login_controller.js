'use strict';

module.exports = function(app) {
  app.controller('loginCtrl', ['$scope', '$http', '$cookies', '$base64', '$location', function($scope, $http, $cookies, $base64, $location) {
    $scope.errors = [];

    $scope.login = function() {
      $scope.errors = [];
      $http.defaults.headers.common.Authorization = 'Basic ' + $base64.encode($scope.user.email + ':' + $scope.user.password);

      $http({
        method: 'GET',
        url: '/api/login'
      })
      .success(function(data) {
        console.log('success');
        $cookies.jwt = data.jwt;
        $location.path('/calendar');
      })
      .error(function(data) {
        console.log('error!');
        console.log(data);
        $scope.errors.push(data);
      });
    };

    $scope.signUp = function() {
      $scope.errors = [];
      if ($scope.newUser.password !== $scope.newUser.passwordConfirmation) $scope.errors.push({msg: 'password and confirmation did not match'});
      if (!$scope.newUser.email) $scope.errors.push({msg: 'did note specify a email'});

      if ($scope.errors.length) return;
      // $scope.newUser.email = $base64.encode($scope.newUser.email);
      // $scope.newUser.password = $base64.encode($scope.newUser.password);
      // $scope.newUser.group = $base64.encode($scope.newUser.group);

      $http({
        method: 'POST',
        url: '/api/newUser',
        data: $scope.newUser
      })
      .success(function(data) {
        console.log('success!');
        $cookies.jwt = data.jwt;
        $location.path('/calendar');
      })
      .error(function(data) {
        console.log('error!');
        console.log(data);
        $scope.errors.push(data);
      });
    };
  }]);
};
