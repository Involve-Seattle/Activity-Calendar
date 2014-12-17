'use strict';

module.exports = function(app) {
  app.controller('navCtrl', ['$scope', '$http', '$cookies', '$location', 'userService', function($scope, $http, $cookies, $location, userService) {

//include the final code from Steph's loggedin_controller from notes app
    // $scope.user = {
    //   email: $cookies.email
    // };

    // $scope.includeTemplate = function() {
    //   if ($cookies.jwt) {
    //     return "/users/loggedin_template.html"; //jshint ignore:line
    //   }
    //   return ""; //jshint ignore: line
    // };

    // $scope.signOut = function($cookies) {
    //   userService.signOut($cookies);
    //   $location.path('/users');
    //   return $cookies;
    // };

  }]);
};
