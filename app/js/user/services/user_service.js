'use strict';

module.exports = function(app) {
  app.factory('userService', ['$http', '$cookies', '$base64', '$location', '$rootScope', function($http, $cookies, $base64, $location, $rootScope) {

    return {
      loginService: function(user) {
        $http.defaults.headers.common.Authorization = 'Basic ' + $base64.encode(user.email + ':' + user.password); //jshint ignore:line
        return $http({
          method: 'GET',
          url: '/api/login',
          data: user
        });
      },

      signUpService: function(newUser, $cookies) {
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
          newUser.jwt = data.jwt;
        });
      },

      signedIn: function($cookies) {
        if (!$cookies.jwt || !$cookies.jwt.length) return $location.path('/login');
        // console.log('user logged in');
        // $location.path('/calendar');
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
