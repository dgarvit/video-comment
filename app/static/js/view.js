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

navigator.getUserMedia({video: true, audio: true}, function(localMediaStream) {
	var video = document.getElementById('webcam');
	video.src = window.URL.createObjectURL(localMediaStream);
	video.onloadedmetadata = function(e) {

	};
}, errorCallback);