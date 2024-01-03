document.getElementById('imageInput').addEventListener('change', handleImage);

function handleImage(e) {
    const canvasOriginal = document.getElementById('canvasOriginal');
    const contextOriginal = canvasOriginal.getContext('2d');

    const img = new Image();
    img.onload = function () {
        // Set the canvas size to the image size
        canvasOriginal.width = img.width;
        canvasOriginal.height = img.height;

        // Draw the original image on the canvas
        contextOriginal.drawImage(img, 0, 0, img.width, img.height);

        // Show the original image
        const originalImage = document.getElementById('originalImage');
        originalImage.src = canvasOriginal.toDataURL();
        originalImage.style.display = 'block';
    };

    // Read the selected image
    img.src = URL.createObjectURL(e.target.files[0]);
}

function processImage() {
    const canvasOriginal = document.getElementById('canvasOriginal');
    const contextOriginal = canvasOriginal.getContext('2d');

    const canvasProcessed = document.getElementById('canvasProcessed');
    const contextProcessed = canvasProcessed.getContext('2d');

    const img = new Image();
    img.onload = function () {
        // Set the canvas size to the image size
        canvasOriginal.width = img.width;
        canvasOriginal.height = img.height;
        canvasProcessed.width = img.width;
        canvasProcessed.height = img.height;

        // Draw the original image on the original canvas
        contextOriginal.drawImage(img, 0, 0, img.width, img.height);

        // Show the original image
        const originalImage = document.getElementById('originalImage');
        originalImage.src = canvasOriginal.toDataURL();
        originalImage.style.display = 'block';

        // Draw the image on the processed canvas
        contextProcessed.drawImage(img, 0, 0, img.width, img.height);

        // Process the image (e.g., convert to grayscale)
        convertToGrayscale(contextProcessed, img.width, img.height);

        // Show the processed image
        const outputImage = document.getElementById('outputImage');
        outputImage.src = canvasProcessed.toDataURL();
        outputImage.style.display = 'block';
    };

    // Read the selected image
    img.src = URL.createObjectURL(document.getElementById('imageInput').files[0]);
}

function convertToGrayscale(context, width, height) {
    const imageData = context.getImageData(0, 0, width, height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        const red = data[i];
        const green = data[i + 1];
        const blue = data[i + 2];

        // Calculate the grayscale value
        const grayscale = 0.3 * red + 0.59 * green + 0.11 * blue;

        // Set the values for red, green, and blue to the grayscale value
        data[i] = grayscale;
        data[i + 1] = grayscale;
        data[i + 2] = grayscale;
    }

    // Set the processed image back to the canvas
    context.putImageData(imageData, 0, 0);
}
