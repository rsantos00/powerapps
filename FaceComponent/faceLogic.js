
setTimeout(function () {
    ruisantos.FaceComponent5.StaticInstance.ReceiveData("Ready");
    ruisantos.FaceComponent5.StaticInstance.refreshData();
    StartAR("");
}, 10000)

var found = false;

function StartAR(image) {
    const video = document.getElementById('video')

    Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('https://arscripts.azurewebsites.net/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('https://arscripts.azurewebsites.net/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('https://arscripts.azurewebsites.net/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('https://arscripts.azurewebsites.net/models')
    ]).then(startVideo)

    function startVideo() {
        navigator.getUserMedia(
            { video: {} },
            stream => video.srcObject = stream,
            err => console.error(err)
        ).then(alert("Loaded"));
    }

    video.addEventListener('play', () => {
        const canvas = faceapi.createCanvasFromMedia(video)
        canvas.setAttribute("style", "position: absolute;margin-left: 20px;padding: 0;display: flex;")

        var parent = document.getElementById('video');
        var mainParent = parent.parentNode;
        mainParent.insertBefore(canvas, parent);

        const displaySize = { width: video.width, height: video.height }
        faceapi.matchDimensions(canvas, displaySize)

        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
            if (detections.length == 0 && found) {
                ruisantos.FaceComponent5.StaticInstance.ReceiveData("Not found a face");
                found = false;
            }
            else if (detections.length > 0 && !found) {
                ruisantos.FaceComponent5.StaticInstance.ReceiveData("Found a Face");
                found = true;
            }
            ruisantos.FaceComponent5.StaticInstance.refreshData();

            const resizedDetections = faceapi.resizeResults(detections, displaySize)
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
            faceapi.draw.drawDetections(canvas, resizedDetections)
            faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
            faceapi.draw.drawFaceExpressions(canvas, resizedDetections)

            
        }, 250)
    })

}

