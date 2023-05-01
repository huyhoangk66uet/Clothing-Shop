import fs from 'fs';
import sharp from 'sharp';
import path from 'path';

class ImageProcess {
    async imageToBuffer(image) {
        const buffer = await sharp(image).toBuffer();
        return buffer;
    }

    async bufferToImage(buffer) {
        if (buffer.equals(Buffer.from('', 'hex'))) {
            // console.log('hahaha')
            const __dirname = path.dirname(new URL(import.meta.url).pathname).substring(1);
            buffer = await this.imageToBuffer(fs.readFileSync(path.join(__dirname, '../img/word-image-1467.png')));
            const nbuffer = await sharp(buffer).png({ quality: 30 }).toBuffer();
            return nbuffer;
        }
        const nbuffer = await sharp(buffer).png({ quality: 100 }).toBuffer();
        return nbuffer;
    }
    base64ToBuffer(base64String) {
        return Buffer.from(base64String, 'base64');
    }
    bufferToDataUrl(mimeType, buffer) {
        const str = buffer.toString('base64');
        return 'data:' + mimeType + ';base64,' + str;
    }
    createUrl(buffer) {
        const dataUrl = this.bufferToDataUrl('image/png', buffer);
        // console.log(dataUrl);
        return dataUrl;
    }
}

export default new ImageProcess;



