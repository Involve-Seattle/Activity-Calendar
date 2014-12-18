'use strict';

module.exports = function(app) {
  app.controller('calendCtrl', ['$scope', '$http', '$cookies', 'ResourceBackend', '$location', function($scope, $http, ResourceAuth, ResourceBackend, $cookies, $location) {
    var calBackend = new ResourceBackend('events');
    $scope.user = {};
    // var auth = new ResourceAuth();
    console.log($cookies);
    // auth.signedIn($cookies);

    // $http.defaults.headers.common['jwt'] = $cookies.jwt;

    $scope.index = function() {
      // auth.signedIn($cookies);
      calBackend.index()
      .success(function(data) {
        $scope.events = data;
        //console.log(data);
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

    $scope.invite = function() {
      var inviteObj = {friendInfo: $scope.user, eventInfo: $scope.currentEvent };
      console.log(inviteObj);
      $scope.errors = [];
      $http({
        method: 'POST',
        url: '/api/invitation',
        data: $scope.user
      })
      .success(function(data) {
        console.log('success!');
        // $cookies.jwt = data.jwt;
        // $location.path('/calendar');
      });
    };
  }]);
};
