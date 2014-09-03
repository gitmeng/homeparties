'use strict';

angular.module('admin').controller('AdminRequestsController', ['$scope', '$stateParams', '$location', '$anchorScroll', 'Authentication', 'Requests',
	function($scope, $stateParams, $location, $anchorScroll, Authentication, Requests) {
		$scope.authentication = Authentication;

		$scope.orderProp = 'title';

		$scope.create = function() {
			var request = new Requests({
				title: this.title,
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
				$location.path('admin/requests/' + response._id);

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
					$location.path('admin/requests');
				});
			}
		};

		$scope.update = function() {
			var request = $scope.request;
			request.$update(function() {
				$location.path('admin/requests/' + request._id);
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

		$scope.containsObject = function (obj, list) {
			var i;
			for (i = 0; i < list.length; i++) {
				if (list[i] === obj) {
					return true;
				}
			}
			return false;
		};

		$scope.togglePublish = function () {
			$scope.request.published = !$scope.request.published;
			if ($scope.request.published===true) {
				$scope.request.publishedTime = Date.now();
			}
			$scope.update();
		};
	}
]);