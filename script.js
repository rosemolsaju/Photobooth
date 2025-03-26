// Confetti animation function
function startConfetti() {
    let confettiCount = 100;
    let confettiColors = ['#ff4d94', '#ff3366', '#e0c8ff', '#b3c7f9'];
    let confettiContainer = document.getElementById('confetti');

    for (let i = 0; i < confettiCount; i++) {
        let confettiElement = document.createElement('div');
        confettiElement.classList.add('confetti');
        confettiElement.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        confettiElement.style.left = `${Math.random() * 100}vw`;
        confettiElement.style.animationDuration = `${Math.random() * 2 + 3}s`;
        confettiElement.style.animationDelay = `${Math.random() * 3}s`;
        confettiContainer.appendChild(confettiElement);
    }

    setTimeout(() => {
        while (confettiContainer.firstChild) {
            confettiContainer.removeChild(confettiContainer.firstChild);
        }
    }, 5000); // Cleanup after 5 seconds
}

// Start confetti on page load
window.onload = () => {
    setTimeout(() => {
        startConfetti();
    }, 500); // Small delay before confetti starts
};

// Accessing webcam
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const previewImage = document.getElementById('previewImage');
const previewContainer = document.getElementById('previewContainer');
const downloadButton = document.getElementById('downloadButton');

// Setup webcam stream
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => {
        alert('Error accessing webcam: ' + err);
    });

// Filters and mirror effects
let currentFilter = 'none';
let currentFrame = 'none';

function applyFilter(filter) {
    currentFilter = filter;
    video.style.filter = filter;
}

function applyMirror(transform) {
    video.style.transform = transform;
}

// Capture image with filter and frame
function capture() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.filter = currentFilter;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Apply frame effect
    if (currentFrame === 'vintage') {
        ctx.strokeStyle = '#9e9e9e';
        ctx.lineWidth = 10;
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
    } else if (currentFrame === 'polaroid') {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, canvas.height - 50, canvas.width, 50);
    }

    // Add date at the bottom
    const date = new Date();
    const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    ctx.font = '16px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(formattedDate, 10, canvas.height - 10);

    // Show the captured image in preview container
    previewImage.src = canvas.toDataURL('image/png');
    previewContainer.style.display = 'block';
}

// Download the captured image
function downloadImage() {
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'photo.png';
    link.click();
}

// Event listeners for filters
document.getElementById('normalFilter').addEventListener('click', () => applyFilter('none'));
document.getElementById('grayscaleFilter').addEventListener('click', () => applyFilter('grayscale(100%)'));
document.getElementById('sepiaFilter').addEventListener('click', () => applyFilter('sepia(100%)'));
document.getElementById('invertFilter').addEventListener('click', () => applyFilter('invert(100%)'));
document.getElementById('blurFilter').addEventListener('click', () => applyFilter('blur(5px)'));
document.getElementById('mirrorFilter').addEventListener('click', () => applyMirror('scaleX(-1)'));

// Event listeners for frames
document.getElementById('frame1').addEventListener('click', () => currentFrame = 'vintage');
document.getElementById('frame2').addEventListener('click', () => currentFrame = 'polaroid');

// Event listeners for capture and download buttons
document.getElementById('captureButton').addEventListener('click', capture);
document.getElementById('downloadButton').addEventListener('click', downloadImage);
