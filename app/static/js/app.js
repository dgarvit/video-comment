(function() {

	angular.module('View', [])
	.controller('ViewController', ['$scope', '$http', '$location', function(a, b, c){
		a.comments = [];

		var r = this;
		this.postReq = function(url, params, callback) {
			console.log(params);
			b.post(url, params)
			.then(function(response) {
				console.log(response);
				return callback(response.data);
			});
		}

		this.getComments = function() {
			r.postReq(c.url(), {}, function(data) {
				a.comments = data.slice();
			});
		};

		a.postComment = function() {
			var comment = document.getElementById('comment').value;
			var time = document.getElementById('main').currentTime;
			q = b.post(c.url(), {
				'comment' : comment,
				'time': time
			})
			.then(function(response) {
				a.comments = response.data;
				document.getElementById('comment').value = "";
			});
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