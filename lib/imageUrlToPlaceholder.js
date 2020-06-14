const resolveImagePath = require('./resolveImagePath');
const isAbsoluteUrl = require('./isAbsoluteUrl')
const getPlaceHolder = require('./getPlaceHolder')

const imageUrlToPlaceholder = async (imageUrl, { dir, filePath, paletteSize }) => {
  const absoluteUrl = isAbsoluteUrl(imageUrl) ? imageUrl : resolveImagePath(dir, filePath, imageUrl)
  try {
    const placeholder = await getPlaceHolder(absoluteUrl, { paletteSize });
    console.log("\x1b[32m", `Placeholder generated for: ${absoluteUrl}`)
    return placeholder
  } catch (e) {
    console.warn("\x1b[31m", `Couldn't get placeholder for ${absoluteUrl}, ${e}`)
    return imageUrl
  }
}

module.exports = imageUrlToPlaceholder