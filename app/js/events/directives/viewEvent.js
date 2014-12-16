'use strict';

module.exports = function(app) {
  app.directive('viewLargeEvent', function() {
    return {
      restrict: 'EAC',
      templateUrl: 'templateUrl/events/directives/viewEvent.html',
      scope: {
        title: '@',
        address: '@',
        date: '@'
      },
      controller: function($scope, $location) {
        $scope.calendarView = function() {
          $location.path('/calendar');
        };
      }
    };
  });
};
