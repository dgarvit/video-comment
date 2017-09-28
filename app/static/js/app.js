(function() {

	angular.module('View', [])
	.controller('ViewController', ['$scope', '$http', '$location', function(a, b, c){
		a.comments = [];
		var video = document.getElementById('main');
		var popup = document.getElementById('popup');
		this.val = 1;
		function updateFunction() {
			for (var i = 0; i < a.comments.length; i++) {
				if (Math.floor(this.currentTime) == a.comments[i].time) {
					this.pause();
					for (var j = i; a.comments[j].time == Math.floor(this.currentTime); j++) {
						alert(a.comments[i].comment);
					}
					this.currentTime += 1.1;
				}
			}
		}
		video.addEventListener('timeupdate', updateFunction);
		this.postReq = function(url, params, callback) {
			b.post(url, params)
			.then(function(response) {
				return callback(response.data);
			});
		}

		this.getComments = function() {
			var self = this;
			self.postReq(c.url(), {}, function(data) {
				a.comments = data.slice();
			});
		};

		a.postComment = function() {
			var comment = document.getElementById('comment').value;
			var time = video.currentTime;
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
			video.currentTime = time;
		};

		a.popUp = function() {
			if (this.val == 1) {
				this.val = 0;
				popup.innerHTML = "Enable Popups";
				video.addEventListener('timeupdate', updateFunction);
			}

			else {
				this.val = 1;
				popup.innerHTML = "Disable Popups";
				video.addEventListener('timeupdate', updateFunction);
			}
		};

		this.getComments();
	}])
	.config(['$httpProvider', function($httpProvider) {
		$httpProvider.defaults.xsrfCookieName = 'csrftoken';
		$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
	}]);
})();