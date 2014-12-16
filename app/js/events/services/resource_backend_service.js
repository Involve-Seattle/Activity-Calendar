'use strict';

module.exports = function(app) {
  var handleErrors = function(data) {
    console.log(data);
  };

  app.factory('ResourceBackend', ['$http', function($http) {
    return function(resourceName) {
      return {
        index: function() {
          return $http({
            method: 'GET',
            url: '/api/' + resourceName
          })
          .error(handleErrors);
        }
      };
    };
  }]);
};
