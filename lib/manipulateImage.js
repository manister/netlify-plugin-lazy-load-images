const imageUrlToPlaceholder = require('./imageUrlToPlaceholder')
const srcset = require('srcset')

const manipulateImage = async (image, cfg) => {
  const imgSrc = image.getAttribute('src')
  const imgSrcset = image.getAttribute('srcset')
  if (imgSrc) {
    const updatedSrc = await imageUrlToPlaceholder(imgSrc, cfg)
    image.setAttribute('src', updatedSrc)
    image.setAttribute('data-lazy-src', imgSrc)
  }
  if (imgSrcset) {
    const imgSrcsetParsed = srcset.parse(imgSrcset)
    const updatedImgSrcsetParsed = await Promise.all(imgSrcsetParsed.map(async (srcsetObj) => ({
      ...srcsetObj,
      url: await imageUrlToPlaceholder(srcsetObj.url, cfg),
    })))
    const updatedImgSrcset = srcset.stringify(updatedImgSrcsetParsed)
    image.setAttribute('srcset', updatedImgSrcset)
    image.setAttribute('data-lazy-srcset', imgSrcset)
  }
  return
}

module.exports = manipulateImage