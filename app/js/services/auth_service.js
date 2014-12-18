// 'use strict';

// /*jshint sub:true*/

// module.exports = function(app) {
//   app.factory('ResourceAuth', ['$location', function($location) {
//     return function() {
//       return {
//         signOut: function($cookies) {
//           delete $cookies.jwt;
//           return $location.path('/calendar');
//         },

//         signedIn: function($cookies) {
//           if (!$cookies.jwt || !$cookies.jwt.length) return $location.path('/login');
//           console.log('user logged in');
//           $location.path('/calendar');
//         }
//       };
//     };
//   }]);
// };
