'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('userService', function() {
  beforeEach(angular.mock.module('involveApp'));
  // var Service;
  var $httpBackend;
  var userServiceTest;
  var jwt = {jwt: '1'};
  var newUser = {
    email: 'test@example.com',
    password: 'Test1@'
  };
  var $cookies = {};
  var $rootScope;

  beforeEach(angular.mock.inject(function(userService, $rootScope, $cookies, _$httpBackend_) {
    userServiceTest = userService;
    $httpBackend = _$httpBackend_;
    // $cookies.test = 'test';
    $rootScope = {};
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should make a post request to create a new user', function() {
    $httpBackend.expectPOST('/api/newUser').respond(200, jwt);
    newUser.passwordConfirmation = newUser.password;
    userServiceTest.signUpService(newUser, $cookies)
    .success(function(data) {
      expect(data.jwt).toEqual('1');
    });

    $httpBackend.flush();
  });

  it('should make a get request to log in an existing user', function() {
    $httpBackend.expectGET('/api/login').respond(200, jwt);

    userServiceTest.loginService(newUser, $cookies)
    .success(function(data) {
      expect(data.jwt).toEqual('1');
    });

    $httpBackend.flush();
  });

  it('should log user out', function() {
    $cookies = userServiceTest.logout();
    expect($cookies.jwt).not.toBeDefined();
  })
});
