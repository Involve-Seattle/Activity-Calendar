'use strict';

module.exports = function(app) {
  app.controller('calendCtrl', ['$scope', '$http', '$cookies', '$location', 'ResourceBackend', function($scope, $http, ResourceAuth, ResourceBackend, $cookies, $location) {
    var calBackend = new ResourceBackend('events');
    var auth = new ResourceAuth();

    // auth.signedIn($cookies);

    // $http.defaults.headers.common['jwt'] = $cookies.jwt;

    $scope.index = function() {
      console.log('hullo')
      auth.signedIn($cookies);
      calBackend.index()
      .success(function(data) {
        $scope.events = data;
      });
    };
  }]);
};
