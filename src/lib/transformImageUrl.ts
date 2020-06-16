import resolveImagePath from './resolveImagePath'
import isAbsoluteUrl from './isAbsoluteUrl'

const transformImageUrl = (imageUrl: string, dir: string, filePath: string) => isAbsoluteUrl(imageUrl) ? imageUrl : resolveImagePath(dir, filePath, imageUrl)

export default transformImageUrl