'use strict';

require('../../app/js/client');
require('../../app/js/user/controllers/login_controller');
require('angular-mocks');

describe('login controller', function() {
  beforeEach(angular.mock.module('involveApp'));
  var $controllerConstructor;
  var $httpBackend;
  var $scope;
  var $cookies;
  var jwt = {jwt: '1'};

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $controllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    var loginController = $controllerConstructor('loginCtrl', {$scope: $scope});
    expect(typeof loginController).toBe('object');
  });

  describe('rest request', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $cookies = {};
      $controllerConstructor('loginCtrl', {$scope: $scope, $cookies: $cookies});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a POST request to user', function() {
      $httpBackend.expectPOST('/api/newUser').respond(200, jwt);
      $scope.newUser = {
        email: 'test@example.com',
        password: 'Test1@',
        passwordConfirmation: 'Test1@'
      };
      $scope.signUp();
      $httpBackend.flush();

      expect($cookies.jwt).toEqual('1');
    });

    it('should make a GET request to users', function() {
      $httpBackend.expectGET('/api/login').respond(200, jwt);
      $scope.user = {
        email: 'test@example.com',
        password: 'Test1@'
      };
      $scope.login();
      $httpBackend.flush();

      expect($cookies.jwt).toEqual('1');
    });
  });

  describe('user error handling', function() {

    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $controllerConstructor('loginCtrl', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('returns server signup errors', function() {
      $scope.newUser = {
        email: 'testanother@example.com',
        password: 'Test1@',
        passwordConfirmation: 'Test1@'
      };

      $httpBackend.expectPOST('/api/newUser').respond(500, {msg: 'password needs one number, lowercase, and uppercase letter and must be at least six characters'});

      $scope.signUp();
      $httpBackend.flush();

      expect($scope.errors[0].msg).toBe('password needs one number, lowercase, and uppercase letter and must be at least six characters');
    });

  });

});
