'use strict';

module.exports = function(app) {
  app.controller('loginCtrl', ['$scope', '$http', '$cookies', '$base64', '$location', 'userService', function($scope, $http, $cookies, $base64, $location, userService) {
  // app.controller('loginCtrl', ['$scope', '$http', '$cookies', '$base64', '$location', 'userService', 'ResourceAuth', function($scope, $http, $cookies, $base64, $location, userService, ResourceAuth) {
    $scope.errors = [];
    // var auth = new ResourceAuth();
    // auth.signedIn($cookies);
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

// <<<<<<< HEAD
      userService.signUp($scope.newUser)
      // .success(function(data) {
      //   $cookies.jwt = data.jwt;
      //   $location.path('/calendar');
      // })
// =======
//       userService.signUp($scope.newUser)
//       .success(function(data) {
//         $cookies.jwt = data.jwt;
//         $location.path('/calendar');
//       })
// >>>>>>> b203219dfc2c8ab46209f9bb95a300bf8e7ee241
      .error(function(data) {
        $scope.errors.push(data);
      });

    };
  }]);
};
