document.addEventListener("DOMContentLoaded", function () {
    var video = document.getElementById("video");
    var captureBtn = document.getElementById("capture-btn");
    var capturedImage = document.getElementById("captured-image");
    var downloadBtn = document.getElementById("download-btn");

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then(function (stream) {
                video.srcObject = stream;
            })
            .catch(function (error) {
                console.error("Error accessing camera:", error);
                document.getElementById('camera').innerHTML = "<p>Kamera nicht benutzbar!</p>";
            });

        captureBtn.addEventListener("click", function () {
            var canvas = document.createElement("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            var context = canvas.getContext("2d");
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            var imageDataURL = canvas.toDataURL("image/png");

            capturedImage.src = imageDataURL;
            downloadBtn.style.display = "block";
        });

        downloadBtn.addEventListener("click", function () {
            if (isSafari()) {
                // Workaround for Safari
                var popup = window.open();
                popup.document.write('<img src="' + capturedImage.src + '" />');
            } else {
                var link = document.createElement("a");
                link.href = capturedImage.src;
                link.download = "captured_image.png";
                link.click();
            }
        });
    } else {
        console.error("MediaDevices API not supported");
    }

    // Funktion zur Identifizierung von Safari-Browser
    function isSafari() {
        return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    }
});
