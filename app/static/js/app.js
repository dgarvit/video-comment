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

	function hasGetUserMedia() {
  return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

if (hasGetUserMedia()) {
  // Good to go!
} else {
  alert('getUserMedia() is not supported in your browser');
}

var errorCallback = function(e) {
console.log('Reeeejected!', e);
};

/*navigator.getUserMedia({video: true, audio: false}, function(localMediaStream) {
	var video = document.getElementById('webcam');
	video.src = window.URL.createObjectURL(localMediaStream);
	video.onloadedmetadata = function(e) {
		/*var file = $('#fileInput').get(0).files.item(0); // instanceof File
		$.ajax({
  			type: 'POST',
  			url: 'upload.php',
  			data: file,
  			contentType: 'application/my-binary-type' // set to whatever you like
  			processData: false
		});*/
	/*};
}, errorCallback);*/

function send() {
	/*var video = document.getElementById('webcam');
	console.log(video.currentTime);*/

	var file = document.getElementById("webcam");
	console.log(file);
	var blob = new Blob(["i am a blob"]);
    //var blob = yourAudioBlobCapturedFromWebAudioAPI;// for example   
    var reader = new FileReader();
    // this function is triggered once a call to readAsDataURL returns
    reader.onload = function(event){
        var fd = new FormData();
        fd.append('fname', 'test.txt');
        fd.append('data', file);
        /*$.ajax({
            type: 'POST',
            url: '/app/view/4',
            data: fd,
            processData: false,
            contentType: false
        }).done(function(data) {
            // print the output from the upload.php script
            console.log(data);
        });*/

        console.log(fd);
    };      
    // trigger the read from the reader...
    reader.readAsDataURL(blob);
}

function uploadCanvasData()
{
    var canvas = document.getElementById('webcam');
    var dataUrl = canvas.toDataURL("video/mp4");

    var blob = dataURItoBlob(dataUrl);

    var formData = new FormData();
    formData.append("file", blob);
    console.log(formData);/*
    var request = new XMLHttpRequest();
    request.onload = completeRequest;
    request.open("POST", "IdentifyFood");
    request.send(formData);*/
}

function dataURItoBlob(dataURI)
{
    var byteString = atob(dataURI.split(',')[1]);

    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++)
    {
        ia[i] = byteString.charCodeAt(i);
    }

    var bb = new Blob([ab], { "type": mimeString });
    return bb;
}

navigator.getUserMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia;

if (navigator.getUserMedia) {
   navigator.getUserMedia({ audio: true, video: { width: 1280, height: 720 } },
      function(stream) {
         var video = document.getElementById('webcam');
         video.srcObject = stream;
         video.onloadedmetadata = function(e) {
           video.play();
         };
      },
      function(err) {
         console.log("The following error occurred: " + err.name);
      }
   );
} else {
   console.log("getUserMedia not supported");
}
})();