'use strict';

angular.module('requests').controller('RequestsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Requests',
	function($scope, $stateParams, $location, Authentication, Requests) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var request = new Requests({
				title: this.title,
				dateTime: this.dateTime,
				time: this.time,
				location: this.location,
				city: this.city,
				contactName: this.contactName,
				contactEmail: this.contactEmail,
				otherInfo: this.otherInfo
			});
			request.$save(function(response) {
				$location.path('requests/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			this.title = '';
			this.dateTime = null;
			this.time = null;
			this.location = '';
			this.city = '';
			this.contactName = '';
			this.contactEmail = '';
			this.otherInfo = '';
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