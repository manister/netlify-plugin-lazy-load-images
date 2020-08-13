import resolveImagePath from './resolveImagePath'
import isAbsoluteUrl from './isAbsoluteUrl'

const isDataUrl = (url: string) => url.substr(0, 5) === 'data:';

const transformImageUrl = (imageUrl: string, dir: string, filePath: string) => isAbsoluteUrl(imageUrl) || isDataUrl(imageUrl) ? imageUrl : resolveImagePath(dir, filePath, imageUrl)

export default transformImageUrl