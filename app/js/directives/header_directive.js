'use strict';

module.exports = function(app) {
  app.directive('headerDirec', ['$location', 'userService', function($location, userService) {

    return {
      restrict: 'EA',
      templateUrl: '/templates/directives/header_template.html',

      controller: function($scope, $location, userService) {
        $scope.showMenu = false;

        $scope.calendar = function() {
          $scope.showMenu = false;
          $location.path('/calendar');
        };

        $scope.mymeetings = function() {
          $scope.showMenu = false;
          $location.path('/mymeetings');
        };

        $scope.logout = function() {
          $scope.showMenu = false;
          $location.path('/login');
          userService.logout();
        };
      }
    };

  }]);
};
