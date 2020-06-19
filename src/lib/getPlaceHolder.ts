import isAbsoluteUrl from './isAbsoluteUrl'
import Vibrant from 'node-vibrant'
import probe from 'probe-image-size'
import * as fs from 'fs'

const getImageDimensions = async (url) => {
  const { width, height }: { width: number, height: number } = isAbsoluteUrl(url) ? await probe(url) : await probe(fs.createReadStream(url));
  return { width, height }
}

const createPlaceHolderSVG = (width: number, height: number, colours: Array<string>) => {
  const rectHeight = height / colours.length; // calculate height of rectactangles that will make up placeholder
  return `
  <svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="f1" x="0" y="0">
      <feGaussianBlur in="SourceGraphic" stdDeviation="20,20" />
    </filter>
  </defs>
  <g filter="url(#f1)">
    ${colours.map((colour, i) => `<rect y="${i * rectHeight}" width="${width}" height="${rectHeight}" fill="${colour}"></rect>`)}
  </g>
  </svg>`
}

const getPlaceHolder = async (imageURL: string, { paletteSize }: { paletteSize: number }) => {
  const vibrantColours = await Vibrant.from(imageURL).getPalette()
  const colourArray = Object.values(vibrantColours)
  const hexes = colourArray
    .sort((c1, c2) => c1 && c2 ? c2.getPopulation() - c1.getPopulation() : 0) // order by colour frequency in image
    .flatMap(colour => colour ? [colour.getHex()] : []) // remove null values if they exist
  const colours = hexes.slice(0, paletteSize) // cut array off at paletteSize as these are the only colours we'll need
  const { width, height } = await getImageDimensions(imageURL) // get the wdith and height
  const svg = createPlaceHolderSVG(width, height, colours)
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export default getPlaceHolder;
