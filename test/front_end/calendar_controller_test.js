'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('Calendar Ctrl', function() {
  var $controllerConstructor;
  var $httpBackend;
  var $scope;
  var $cookies = {jwt: '1'};
  var currentEvent = {'eventTitle': 'test event', '_id': '1'};

  beforeEach(angular.mock.module('involveApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $controllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    var calendController = $controllerConstructor('calendCtrl', {$scope: $scope});
    expect(typeof calendController).toBe('object');
  });

  describe('rest request', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $controllerConstructor('calendCtrl', {$scope: $scope, $cookies: $cookies});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a call to index', function() {
      $httpBackend.expectGET('/api/events').respond(200, [currentEvent]);
      $scope.index();
      $httpBackend.flush();

      expect($scope.events).toBeDefined();
      expect(Array.isArray($scope.events)).toBeTruthy();
      expect(typeof $scope.events[0]).toBe('object');
      expect($scope.events[0].eventTitle).toBe('test event');
    });

    it('should view one note', function() {
      $scope.viewLarge(currentEvent);
      expect($scope.currentEvent).toBe(currentEvent);
      expect($scope.show).toBe(true);

    });

    it('view all notes', function() {
      $scope.viewAll();
      expect($scope.show).toBe(false);
    });

    it('send an email', function() {
      $httpBackend.expectPOST('/api/invitation').respond(200, {msg: 'success'});
      $scope.user = {email: 'test'};
      $scope.eventInfo = currentEvent;
      $scope.invite();

      $httpBackend.flush();

      expect($scope.user).toBe(null);
    });
  });
});
