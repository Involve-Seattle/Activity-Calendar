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
        if (newUser.password !== newUser.passwordConfirmation || newUser.password === undefined) {
          return ({msg: 'password and confirmation did not match'});
        }
        if (!newUser.email) {
          return ({msg: 'did not specify an email'});
        }

        newUser.email = $base64.encode(newUser.email);
        newUser.password = $base64.encode(newUser.password);
        return $http({
          method: 'POST',
          url: '/api/newUser',
          data: newUser
        });
      },

      logout: function($cookies) {
        $cookies.jwt = undefined;
        return $cookies;
      }

    };

  }]);
};
