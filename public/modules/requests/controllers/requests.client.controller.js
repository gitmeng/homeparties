'use strict';

angular.module('requests').controller('RequestsController', ['$scope', '$stateParams', '$location', '$anchorScroll', 'Authentication', 'Requests',
	function($scope, $stateParams, $location, $anchorScroll, Authentication, Requests) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var request = new Requests({
				title: this.title,
				dateTime: this.dateTime,
				date: this.date,
				time: this.time,
				location: this.location,
				city: this.city,
				contactName: this.contactName,
				contactEmail: this.contactEmail,
				otherInfo: this.otherInfo
			});
			request.$save(function(response) {
				// Redirect to the request view if successfully created.
				$location.path('requests/' + response._id);

				// Reset the form if the request was successfully created.
				this.title = null;
				this.dateTime = null;
				this.date = null;
				this.time = null;
				this.location = null;
				this.city = null;
				this.contactName = null;
				this.contactEmail = null;
				this.otherInfo = null;

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;

				// Scroll to top of the page.
				// Set the location.hash to the id of the header
				$location.hash('header');
				// Call $anchorScroll() to scroll to top.
				$anchorScroll();
			});


		};

		$scope.remove = function(request) {
			if (request) {
				request.$remove();

				for (var i in $scope.requests) {
					if ($scope.requests[i] === request) {
						$scope.requests.splice(i, 1);
					}
				}
			} else {
				$scope.request.$remove(function() {
					$location.path('requests');
				});
			}
		};

		$scope.update = function() {
			var request = $scope.request;

			request.$update(function() {
				$location.path('requests/' + request._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.requests = Requests.query();
		};

		$scope.findOne = function() {
			$scope.request = Requests.get({
				requestId: $stateParams.requestId
			});
		};
	}
]);