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
      calBackend.index()
      .success(function(data) {
        $scope.events = data;
        console.log(data);
      });
    };

    $scope.viewLarge = function(currentEvent) {
      $scope.currentEvent = currentEvent;
      $scope.show = true;
      console.log($scope.currentEvent);
    };

    $scope.viewAll = function() {
      $scope.show = false;
      // console.log($location);
    };

  }]);
};
