import imageUrlToPlaceholder from './imageUrlToPlaceholder'
import transformImageUrl from './transformImageUrl'
import srcset from 'srcset'
import fetch from 'node-fetch'
import * as fs from 'fs';

import isAbsoluteUrl from './isAbsoluteUrl'

const getRemoteFileSize = async (url: string) => {
  const res = await fetch(url, { method: 'HEAD' })
  const size = await res.headers.get('content-length')
  return size ? parseInt(size) : 0;
}

const getFileSize = async (url: string) => {
  try {
    return isAbsoluteUrl(url) ? await getRemoteFileSize(url) : fs.statSync(url).size;
  } catch (e) {
    console.warn(`Could\'t get file size for ${url}`)
    return 0
  }
}

type ManipulateImageOptions = { dir: string, paletteSize: number, filePath: string, replaceThreshold: number }

const manipulateImage = async (image: HTMLElement, { dir, paletteSize, filePath, replaceThreshold }: ManipulateImageOptions) => {
  const imgSrc = image.getAttribute('src')
  const imgSrcset = image.getAttribute('srcset')
  const transformedImgSrc = imgSrc ? transformImageUrl(imgSrc, dir, filePath) : null;
  const imgFileSize = transformedImgSrc ? await getFileSize(transformedImgSrc) : 0;
  const updatedSrc = transformedImgSrc && imgFileSize > replaceThreshold ? await imageUrlToPlaceholder(transformedImgSrc, paletteSize) : null;

  if (imgSrc && updatedSrc) {
    image.setAttribute('src', updatedSrc)
    image.setAttribute('data-lazy-src', imgSrc)
  }
  const imgSrcsetParsed = imgSrcset ? srcset.parse(imgSrcset) : [];

  const imgSrscetParsedUrlsTransformed = await Promise.all(imgSrcsetParsed.map(async srcsetObj => {
    const url = transformImageUrl(srcsetObj.url, dir, filePath)
    const fileSize = await getFileSize(url)
    return {
      ...srcsetObj,
      url,
      fileSize
    }
  }))

  const updatedImgSrcsetParsed =
    imgSrscetParsedUrlsTransformed.length > 0
      ? await Promise.all(imgSrscetParsedUrlsTransformed.map(async (srcsetObj) => (
        {
          ...srcsetObj,
          url: srcsetObj.fileSize > replaceThreshold ? await imageUrlToPlaceholder(srcsetObj.url, paletteSize) : srcsetObj.url,
        }
      )))
      : []

  const updatedImgSrcset =
    updatedImgSrcsetParsed.length > 0 &&
      updatedImgSrcsetParsed.every(({ url }) => url.length > 1)
      ? srcset.stringify(updatedImgSrcsetParsed)
      : null;

  if (imgSrcset && updatedImgSrcset) {
    image.setAttribute('srcset', updatedImgSrcset)
    image.setAttribute('data-lazy-srcset', imgSrcset)
  }

  return [
    transformedImgSrc && updatedSrc && imgFileSize ? { url: transformedImgSrc, fileSize: imgFileSize } : { url: 'file not updated', fileSize: 0 },
    ...(imgSrscetParsedUrlsTransformed && updatedImgSrcset ? imgSrscetParsedUrlsTransformed.map(({ url, fileSize }) => ({ url, fileSize })) : [])
  ]


}
export default manipulateImage