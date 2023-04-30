import fs from 'fs';
import sharp from 'sharp';
import path from 'path';
import canvas from 'canvas';

class ImageProcess {
    async imageToBuffer(image) {
        const buffer = await sharp(image).toBuffer();
        return buffer;
    }

    async bufferToImage(buffer) {
        if (buffer.equals(Buffer.from('30', 'hex'))) {
            const __dirname = path.dirname(new URL(import.meta.url).pathname).substring(1);
            buffer = await this.imageToBuffer(fs.readFileSync(path.join(__dirname, '../img/word-image-1467.png')));
        }
        const nbuffer = await sharp(buffer).png({ quality: 70 }).toBuffer();
        return nbuffer;
    }

    createUrl(buffer) {
        sharp(buffer)
            .metadata()
            .then(metadata => {
                const width = metadata.width;
                const height = metadata.height;
                // Tạo ImageData và vẽ hình ảnh trên canvas
                const imageData = canvas.createImageData(buffer, width, height);
                const img = new Image();
                img.src = imageData.data;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                const dataUrl = canvas.toDataURL();
                return dataUrl;
            })
            .catch(error => {
                console.error(error);
            });
    }
}

export default new ImageProcess;



