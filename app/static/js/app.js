(function() {

	angular.module('View', [])
	.controller('ViewController', ['$scope', '$http', '$location', function(a, b, c){
		a.comments = [];
		this.getComments = function() {
			b.post(c.url(), {})
			.then(function(response) {
				a.comments = response.data.slice();
			});
		};
		this.getComments();
	}])
	.config(['$httpProvider', function($httpProvider) {
		$httpProvider.defaults.xsrfCookieName = 'csrftoken';
		$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
	}]);
})();