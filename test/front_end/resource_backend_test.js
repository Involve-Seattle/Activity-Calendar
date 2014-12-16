'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('resource service', function() {
  beforeEach(angular.mock.module('notesApp'));
  var Service;
  var $httpBackend;
  var notesService;
  var testNote = {'_id': '1', 'noteBody': 'hipster ipsum'};
  var testNote2 = {'_id': '1', 'noteBody': 'bieber ipsum'};
  var deleteMsg = {msg: 'success!'};

  beforeEach(angular.mock.inject(function(ResourceBackend, _$httpBackend_){
    Service = ResourceBackend;
    $httpBackend = _$httpBackend_;
    eventService = new Service('events');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should make a get request to notes', function() {
    $httpBackend.expectGET('/api/events').respond(200, []);

    var promise = eventService.index();

    promise.success(function(data) {
      expect(Array.isArray(data)).toBe(true);
    });

    $httpBackend.flush();
  });
});
