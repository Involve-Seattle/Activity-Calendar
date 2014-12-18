'use strict';

module.exports = function(app) {
  app.directive('newEmailDirec', function() {
    return {
      restrict: 'EAC',
      templateUrl: 'templates/events/directives/new_email_form.html',
      scope: {send: '&',
              email: '=',
              content: '=',
              fieldname: '@',
              currentEvent: '='},
      controller: function($scope) {
        $scope.sendInvite = function() {
          var eventObj = ({content: $scope.resource, currentEvent: $scope.currentEvent});
          console.log(eventObj);
          $scope.send(eventObj);
          $scope.resource = null;
        };
      }
    };
  });
};
