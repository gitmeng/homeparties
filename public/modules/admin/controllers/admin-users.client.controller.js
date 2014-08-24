'use strict';

angular.module('users').controller('AdminUsersController', ['$scope', '$http', '$location', 'Authentication', 'Users',
	function($scope, $http, $location, Authentication, Users) {
		$scope.authentication = Authentication;

		$scope.orderProp = 'firstName';

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				//If successful we assign the response to the global user model
				$scope.authentication.user = response;

				//And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.find = function() {
			$scope.users = Users.query();
		};
	}
]);