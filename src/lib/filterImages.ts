import { parse } from 'node-html-parser'

const filterImages = (images: Array<HTMLSourceElement | HTMLImageElement>, selectorList: string) => {
  //node-html-parser query selector doesn't understand comma seperated selectors
  const selectorArray = selectorList.split(',').map(str => str.trim())
  return images.filter(image => selectorArray.every(selector => !parse(image.outerHTML).querySelector(selector)))
}

export default filterImages

