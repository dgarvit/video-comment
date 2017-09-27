(function() {

	angular.module('View', [])
	.controller('ViewController', ['$scope', '$http', '$location', function(a, b, c){
		a.comments = [];

		this.postReq = function(url, params, callback) {
			b.post(url, params)
			.then(function(response) {
				console.log(response);
				return callback(response.data);
			});
		}

		this.getComments = function() {
			var self = this;
			self.postReq(c.url(), {}, function(data) {
				a.comments = data.slice();
			});
		};

		this.postComment = function() {
			comment = document.getElementById('comment').value;
		};

		a.skipTo = function(time) {
			document.getElementById('main').currentTime = time;
		};

		this.getComments();
	}])
	.config(['$httpProvider', function($httpProvider) {
		$httpProvider.defaults.xsrfCookieName = 'csrftoken';
		$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
	}]);
})();