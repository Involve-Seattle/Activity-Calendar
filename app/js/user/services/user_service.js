'use strict';

module.exports = function(app) {
  app.factory('userService', ['$http', '$cookies', '$base64', '$location', function($http, $cookies, $base64, $location) {

    return {
      login: function(user) {
        $http.defaults.headers.common.Authorization = 'Basic ' + $base64.encode(user.email + ':' + user.password); //jshint ignore:line
        return $http({
          method: 'GET',
          url: '/api/login',
          data: user
        });
      },

      signUp: function(newUser) {
        return $http({
        method: 'POST',
        url: '/api/newUser',
        data: newUser
        });
      }
    };

  }]);
};
