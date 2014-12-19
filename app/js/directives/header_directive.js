'use strict';

module.exports = function(app) {
  app.directive('headerDirec', ['$location', 'userService', function($location, userService) {

    return {
      restrict: 'EA',
      templateUrl: '/templates/directives/header_template.html',

      controller: function($scope, $location, userService) {

        $scope.calendar = function() {
          $location.path('/calendar');
        };

        $scope.mymeetings = function() {
          $location.path('/mymeetings');
        };

        $scope.logout = function() {
          $location.path('/login');
          userService.logout();
        };
      }
    };

  }]);
};
