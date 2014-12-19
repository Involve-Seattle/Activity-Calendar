'use strict';

module.exports = function(app) {
  app.controller('calendCtrl', ['$scope', '$http', '$cookies', '$location','userService', 'ResourceBackend', function($scope, $http, $cookies, $location, userService, ResourceBackend) {
    var calBackend = new ResourceBackend('events');

    /*jshint sub:true*/
    $http.defaults.headers.common['jwt'] = $cookies.jwt;
    /*jshint sub:false*/
    $scope.index = function() {
      userService.signedIn($cookies);
      calBackend.index()
      .success(function(data) {
        $scope.events = data;
      });
    };

    $scope.viewLarge = function(currentEvent) {
      userService.signedIn($cookies);
      $scope.currentEvent = currentEvent;
      $scope.show = true;
    };

    $scope.viewAll = function() {
      userService.signedIn($cookies);
      $scope.show = false;
    };

    $scope.invite = function() {
      userService.signedIn($cookies);
      var inviteObj = {friendInfo: $scope.user, eventInfo: $scope.currentEvent };
      $scope.errors = [];
      $http({
        method: 'POST',
        url: '/api/invitation',
        data: inviteObj
      })
      .success(function(data) {
        $scope.user = null;
        // $cookies.jwt = data.jwt;
        // $location.path('/calendar');
      });
    };
  }]);
};
