import { loadImage, createCanvas } from 'canvas'
import sum from './sum'
const everyNth = (arr: number[], nth: number) => arr.filter((e, i) => i % nth === nth - 1);

const getAverageColourFromImage = async (imageUrl: string) => {
    const image = await loadImage(imageUrl);
    const { width, height } = image;
    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext('2d')
    ctx.drawImage(image, 0, 0, width, height)
    const imageData = ctx.getImageData(0, 0, width, height)
    const paddedData = [0, 0, 0, ...imageData.data]
    const r = sum(everyNth(paddedData.slice(0), 4)) / (imageData.data.length/4);
    const g = sum(everyNth(paddedData.slice(1), 4)) / (imageData.data.length/4);
    const b = sum(everyNth(paddedData.slice(2), 4)) / (imageData.data.length/4);
    return { rgb: `rgb(${r},${g},${g})`, width, height}
}

export default getAverageColourFromImage