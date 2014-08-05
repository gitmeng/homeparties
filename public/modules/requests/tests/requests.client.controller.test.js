'use strict';

(function() {
	// Requests Controller Spec
	describe('RequestsController', function() {
		// Initialize global variables
		var RequestsController,
			scope,
			$httpBackend,
			$stateParams,
			$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Requests controller.
			RequestsController = $controller('RequestsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one request object fetched from XHR', inject(function(Requests) {
			// Create sample request using the Requests service
			var sampleRequest = new Requests({
				title: 'An Request about MEAN',
				content: 'MEAN rocks!'
			});

			// Create a sample requests array that includes the new request
			var sampleRequests = [sampleRequest];

			// Set GET response
			$httpBackend.expectGET('requests').respond(sampleRequests);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.requests).toEqualData(sampleRequests);
		}));

		it('$scope.findOne() should create an array with one request object fetched from XHR using a requestId URL parameter', inject(function(Requests) {
			// Define a sample request object
			var sampleRequest = new Requests({
				title: 'An Request about MEAN',
				content: 'MEAN rocks!'
			});

			// Set the URL parameter
			$stateParams.requestId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/requests\/([0-9a-fA-F]{24})$/).respond(sampleRequest);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.request).toEqualData(sampleRequest);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Requests) {
			// Create a sample request object
			var sampleRequestPostData = new Requests({
				title: 'An Request about MEAN',
				content: 'MEAN rocks!'
			});

			// Create a sample request response
			var sampleRequestResponse = new Requests({
				_id: '525cf20451979dea2c000001',
				title: 'An Request about MEAN',
				content: 'MEAN rocks!'
			});

			// Fixture mock form input values
			scope.title = 'An Request about MEAN';
			scope.content = 'MEAN rocks!';

			// Set POST response
			$httpBackend.expectPOST('Requests', sampleRequestPostData).respond(sampleRequestResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.title).toEqual('');
			expect(scope.content).toEqual('');

			// Test URL redirection after the request was created
			expect($location.path()).toBe('/requests/' + sampleRequestResponse._id);
		}));

		it('$scope.update() should update a valid request', inject(function(Requests) {
			// Define a sample request put data
			var sampleRequestPutData = new Requests({
				_id: '525cf20451979dea2c000001',
				title: 'An Request about MEAN',
				content: 'MEAN Rocks!'
			});

			// Mock request in scope
			scope.request = sampleRequestPutData;

			// Set PUT response
			$httpBackend.expectPUT(/requests\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/requests/' + sampleRequestPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid requestId and remove the request from the scope', inject(function(Requests) {
			// Create new request object
			var sampleRequest = new Requests({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new requests array and include the request
			scope.requests = [sampleRequest];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/requests\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleRequest);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.requests.length).toBe(0);
		}));
	});
}());