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
        if (newUser.password !== newUser.passwordConfirmation || newUser.password === undefined) {
          return ({msg: 'password and confirmation did not match'});
        }
        if (!newUser.email) {
          return ({msg: 'did not specify an email'});
        }

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

      signedIn: function($cookies) {
        if (!$cookies.jwt || !$cookies.jwt.length) return $location.path('/login');
        // console.log('user logged in');
        $location.path('/calendar');
      },

      logout: function() {
        delete $cookies.jwt;
        $rootScope.user = {
          email: null,
          loggedin: false
        };
        $rootScope.$broadcast('user:loggedOut');
        return $location.path('/login');
      }

    };

  }]);
};
