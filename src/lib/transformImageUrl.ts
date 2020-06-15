import resolveImagePath from './resolveImagePath'
import isAbsoluteUrl from './isAbsoluteUrl'

const transformImageUrl = (imageUrl, dir, filePath) => isAbsoluteUrl(imageUrl) ? imageUrl : resolveImagePath(dir, filePath, imageUrl)

export default transformImageUrl