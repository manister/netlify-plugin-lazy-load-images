const resolveImagePath = require('./resolveImagePath');
const isAbsoluteUrl = require('./isAbsoluteUrl')

const transformImageUrl = (imageUrl, dir, filePath) => isAbsoluteUrl(imageUrl) ? imageUrl : resolveImagePath(dir, filePath, imageUrl)

module.exports = transformImageUrl