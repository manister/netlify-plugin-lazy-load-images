
const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');
const { createCanvas, loadImage } = require("canvas");
const ColorThief = require('colorthief');

const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
  const hex = x.toString(16)
  return hex.length === 1 ? '0' + hex : hex
}).join('');

const getColours = async (url, count) => {
  try {
    colours = count > 1 ? await ColorThief.getPalette(url, count) : [await ColorThief.getColor(url)]
    return colours.map(colour => rgbToHex(...colour))
  } catch (e) {
    return ['#000']
  }
}

const getPlaceHolder = async (imageURL, { paletteSize }) => {

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

module.exports = getPlaceHolder;
