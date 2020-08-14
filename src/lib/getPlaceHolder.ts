import getAverageColourFromImage from './getAverageColourFromImage'

const createPlaceHolderSVG = (width: number, height: number, colour: string) => {
  return `
  <svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="${width}" height="${height}" fill="${colour}"></rect>
  </svg>`
}

const getPlaceHolder = async (imageURL: string) => {
  const {rgba, width, height} = await getAverageColourFromImage(imageURL)
  const svg = createPlaceHolderSVG(width, height, rgba)
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export default getPlaceHolder;
