const resolveImagePath = require('./resolveImagePath');
const isAbsoluteUrl = require('./isAbsoluteUrl')
const getPlaceHolder = require('./getPlaceHolder')

const imageUrlToPlaceholder = async (imageUrl, { dir, filePath, paletteSize }) => {
  const absoluteUrl = isAbsoluteUrl(imageUrl) ? imageUrl : resolveImagePath(dir, filePath, imageUrl)
  console.log("\x1b[32m", `Image found at: ${absoluteUrl}`)
  try {
    return await getPlaceHolder(absoluteUrl, { paletteSize });
  } catch (e) {
    console.warn("\x1b[31m", `Couldn't get placeholder for ${absoluteUrl}, ${e}`)
    return imageUrl
  }
}

module.exports = imageUrlToPlaceholder