
    let currentCameraIndex = 0;
    let cameras = [];
    let html5QrCode;
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };

    function onScanSuccess(decodedText, decodedResult) {
        const now = new Date();
        const timeString = now.toISOString();
        const finalUrl = `result.html?q=${encodeURIComponent(decodedText)}&t=${encodeURIComponent(timeString)}`;
        window.location.href = finalUrl;
    }

    async function startCamera(cameraId) {
        if (html5QrCode) {
            await html5QrCode.stop();
        } else {
            html5QrCode = new Html5Qrcode("reader");
        }

        html5QrCode.start(cameraId, config, onScanSuccess);
    }

    Html5Qrcode.getCameras().then(devices => {
        if (devices && devices.length) {
            cameras = devices;
            startCamera(cameras[currentCameraIndex].id);
        }
    }).catch(err => {
        alert("Kameraga ruxsat berilmadi.");
    });

    document.getElementById('switchCameraBtn').addEventListener('click', () => {
        if (cameras.length <= 1) {
            alert("Faqat bitta kamera topildi");
            return;
        }
        currentCameraIndex = (currentCameraIndex + 1) % cameras.length;
        startCamera(cameras[currentCameraIndex].id);
    });

