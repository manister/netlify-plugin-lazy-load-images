import * as imagemin from 'imagemin';
import imageminPngquant from 'imagemin-pngquant'
import { createCanvas, loadImage } from 'canvas'
import * as ColorThief from 'colorthief'

type RGBColour = [number, number, number]

const rgbToHex = ([r, g, b]: RGBColour) => '#' + [r, g, b].map(x => {
  const hex = x.toString(16)
  return hex.length === 1 ? '0' + hex : hex
}).join('');

const getColours = async (url: string, count: number) => {
  try {
    const colours = count > 1 ? await ColorThief.getPalette(url, count) : [await ColorThief.getColor(url)]
    return (colours as Array<RGBColour>).map(colour => rgbToHex(colour))
  } catch (e) {
    return []
  }
}

const getPlaceHolder = async (imageURL: string, { paletteSize }: { paletteSize: number }) => {

  const image = await loadImage(imageURL)
  const colours = await getColours(imageURL, paletteSize)
  const [h, w] = [image.height, image.width];

  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext("2d");

  const rectH = h / colours.length;

  colours.forEach((colour, index) => {
    ctx.fillStyle = colour;
    ctx.fillRect(0, index * rectH, w, rectH);
  })

  const shrank = await imagemin.buffer(canvas.toBuffer("image/png"), {
    plugins: [
      imageminPngquant()
    ]
  })

  return 'data:image/png;base64,' + shrank.toString('base64');

}

export default getPlaceHolder;
