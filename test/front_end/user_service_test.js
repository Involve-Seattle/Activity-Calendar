'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('userService', function() {
  beforeEach(angular.mock.module('involveApp'));
  // var Service;
  var $httpBackend;
  var userServiceTest;
  var jwt = {jwt: '1'};
  var newUser = {};
  var $cookies;
  var $rootScope;

  beforeEach(angular.mock.inject(function(userService, $rootScope, $cookies, _$httpBackend_) {
    userServiceTest = userService;
    $httpBackend = _$httpBackend_;
    $cookies = {};
    $rootScope = {};
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should make a post request to create a new user', function(done) {
    newUser = {
      email: 'test@example.com',
      password: 'testtest',
      passwordConfirmation: 'testtest'
    };
    $httpBackend.expectPOST('/api/newUser').respond(200, jwt);

    var promise = userServiceTest.signUp(newUser);

    // console.log('promise' + promise);
    promise.success(function(data) {
      console.log('inside promise success');
      // expect($cookies.jwt).toBe('1');
      expect($rootScope.user.email).toBe('test@example.com');
    });
    $httpBackend.flush();

  });

});
