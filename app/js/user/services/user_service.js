'use strict';

module.exports = function(app) {
  app.factory('userService', ['$http', '$cookies', '$base64', '$location', '$rootScope', function($http, $cookies, $base64, $location, $rootScope) {

    return {
      loginService: function(user, $cookies) {
        $http.defaults.headers.common.Authorization = 'Basic ' + $base64.encode(user.email + ':' + user.password); //jshint ignore:line
        return $http({
          method: 'GET',
          url: '/api/login',
          data: user
        })
        .success(function(data) {
          $cookies.jwt = data.jwt;
          $rootScope.user = {
            email: user.email,
            loggedin: true
          };
          $rootScope.$broadcast('user:loggedIn');
          $location.path('/calendar');
        });
      },

      signUpService: function(newUser, $cookies) {
        if (newUser.password !== newUser.passwordConfirmation || newUser.password === undefined) {
          return ({msg: 'password and confirmation did not match'});
        }
        if (!newUser.email) {
          return ({msg: 'did not specify an email'});
        }
        if (newUser.password !== newUser.passwordConfirmation) return ({msg: 'password and confirmation did not match'});
        if (!newUser.email) return ({msg: 'did not specify an email'});
        if (!newUser.password) return ({msg: 'did not specify a password'});

        var newUserEncoded = {};
        newUserEncoded.email = $base64.encode(newUser.email);
        newUserEncoded.password = $base64.encode(newUser.password);
        newUserEncoded.locations = newUser.locations;

        return $http({
          method: 'POST',
          url: '/api/newUser',
          data: newUserEncoded
        })
        .success(function(data) {
          $cookies.jwt = data.jwt;
          $rootScope.user = {
            email: newUser.email,
            loggedin: true
          };
          $rootScope.$broadcast('user:loggedIn');
          $location.path('/calendar');
        });
      },

      signedIn: function($cookies) {
        if (!$cookies.jwt || !$cookies.jwt.length) return $location.path('/login');
      },

      logout: function() {
        delete $cookies.jwt;
        $rootScope.user = {
          email: null,
          loggedin: false
        };
        $rootScope.$broadcast('user:loggedOut');
        return $cookies;
      }

    };

  }]);
};
