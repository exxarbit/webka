const videoElement = document.getElementById('videoElement');

videoElement.addEventListener('loadeddata', () => {
    // Создаем canvas для получения изображения из видео
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Устанавливаем размеры canvas равными размерам видео
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    // Рисуем текущее изображение из видео на canvas
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    // Получаем данные изображений пикселей
    const frame = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = frame.data;

    // Подсчитываем средние значения цвета
    let r = 0, g = 0, b = 0;
    const length = data.length / 4;

    for (let i = 0; i < data.length; i += 4) {
        r += data[i];     // Красный
        g += data[i + 1]; // Зеленый
        b += data[i + 2]; // Синий
    }

    r = Math.floor(r / length);
    g = Math.floor(g / length);
    b = Math.floor(b / length);

    // Устанавливаем цвет фона для видео
    videoElement.style.boxShadow = `0 0 20px rgb(${r}, ${g}, ${b})`;
});