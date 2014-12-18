'use strict';

module.exports = function(app) {
  app.factory('userService', ['$http', '$cookies', '$base64', '$location', '$rootScope', function($http, $cookies, $base64, $location, $rootScope) {

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
        if (newUser.password !== newUser.passwordConfirmation) return ({msg: 'password and confirmation did not match'});
        if (!newUser.email) return ({msg: 'did not specify an email'});
        // if ($scope.errors.length) return;
        var newUserEncoded = {};
        newUserEncoded.email = $base64.encode(newUser.email);
        newUserEncoded.password = $base64.encode(newUser.password);

        return $http({
          method: 'POST',
          url: '/api/newUser',
          data: newUserEncoded
        })
        .success(function(data) {
          console.log('hi from success');
          $cookies.jwt = data.jwt;
          console.log('cookies in success' + $cookies.jwt);
          $rootScope.user = {
            email: newUser.email,
            loggedin: true
          };
          console.log('rootscope email, in success ' + $rootScope.user.email);
          $rootScope.$broadcast('user:loggedIn');
          $location.path('/calendar');
        });
      },

      logout: function() {
        $cookies.jwt = undefined;
        $rootScope.user = {
          email: null,
          loggedin: false
        };
        $rootScope.$broadcast('user:loggedOut');
        $location.path('/users');
        return $cookies;
      }

    };

  }]);
};
