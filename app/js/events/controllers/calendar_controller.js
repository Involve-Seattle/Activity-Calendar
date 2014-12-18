'use strict';

module.exports = function(app) {
  app.controller('calendCtrl', ['$scope', '$http', '$cookies', '$location','ResourceAuth', 'ResourceBackend', function($scope, $http, $cookies, $location, ResourceAuth, ResourceBackend) {
    var calBackend = new ResourceBackend('events');
    var auth = new ResourceAuth();
    auth.signedIn($cookies);
    /*jshint sub:true*/
    $http.defaults.headers.common['jwt'] = $cookies.jwt;
    /*jshint sub:false*/
    $scope.index = function() {
      auth.signedIn($cookies);
      calBackend.index()
      .success(function(data) {
        $scope.events = data;
        //console.log(data);
      });
    };

    $scope.viewLarge = function(currentEvent) {
      auth.signedIn($cookies);
      $scope.currentEvent = currentEvent;
      $scope.show = true;
      console.log($scope.currentEvent);
    };

    $scope.viewAll = function() {
      auth.signedIn($cookies);
      $scope.show = false;
    };

    $scope.invite = function() {
      auth.signedIn($cookies);
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
        console.log('THIS is $scope.user ', $scope.user);
        $scope.user = null;
        // $cookies.jwt = data.jwt;
        // $location.path('/calendar');
      });
    };
  }]);
};
