'use strict';

module.exports = function(app) {
  app.controller('calendCtrl', ['$scope', '$http', '$cookies', 'ResourceBackend', function($scope, $http, ResourceAuth, ResourceBackend, $cookies) {
    var calBackend = new ResourceBackend('events');
    // var auth = new ResourceAuth();
    console.log($cookies);
    // auth.signedIn($cookies);

    // $http.defaults.headers.common['jwt'] = $cookies.jwt;

    $scope.index = function() {
      // auth.signedIn($cookies);
      $scope.events = [{title: 'meeting', location: 'location', date: 'date'}];
      calBackend.index();
      // .success(function(data) {
      //   console.log(data);
      // });
    };
  }]);
};
