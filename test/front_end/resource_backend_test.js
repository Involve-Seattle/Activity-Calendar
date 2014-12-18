'use strict';

require('../../app/js/client');

require('angular-mocks');

describe('resource service', function() {
  beforeEach(angular.mock.module('involveApp'));
  var Service;
  var $httpBackend;
  var eventService;

  beforeEach(angular.mock.inject(function(ResourceBackend, _$httpBackend_) {
    Service = ResourceBackend;
    $httpBackend = _$httpBackend_;
    eventService = new Service('events');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should make a get request to events', function() {
    $httpBackend.expectGET('/api/events').respond(200, []);

    var promise = eventService.index();

    promise.success(function(data) {
      expect(Array.isArray(data)).toBe(true);
    });

    $httpBackend.flush();
  });
});
