import { loadImage, createCanvas } from 'canvas'
import sum from './sum'

//eg 2n - 1 : nth =  2, offset = - 1
const everyNth = (arr: number[], nth: number, offset: number = 0) => arr.filter((e, i) => !((i - offset + 1) % nth));

const getAverageColourFromImage = async (imageUrl: string) => {
    const image = await loadImage(imageUrl);
    const { width, height } = image;
    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext('2d')
    ctx.drawImage(image, 0, 0, width, height)
    const imageData = [...ctx.getImageData(0, 0, width, height).data]

    const r = sum(everyNth([...imageData], 4, -3)) / (imageData.length/4);
    const g = sum(everyNth([...imageData], 4, -2)) / (imageData.length/4);
    const b = sum(everyNth([...imageData], 4, -1)) / (imageData.length/4);
    const a = sum(everyNth([...imageData], 4)) / (imageData.length/4)/255; // want a 0-1

    const rgba = `rgba(${r},${g},${b},${a})`;

    return { rgba, width, height}
}

export default getAverageColourFromImage