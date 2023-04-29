import fs from 'fs'
import sharp from 'sharp'

class ImageProcess {
    async imageToBuffer(image) {
        const buffer = await sharp(image).toBuffer();
        return buffer;
    }

    async bufferToImage(buffer) {
        if (buffer == 0) {
            buffer = this.imageToBuffer(fs.readFileSync('https://wiki.tino.org/wp-content/uploads/2021/07/word-image-1467.png'));
        }
        const nbuffer = await sharp(buffer).png({quality: 70}).toBuffer;
        return nbuffer;
    }
}

export default new ImageProcess;



