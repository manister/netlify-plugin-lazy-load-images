import imageUrlToPlaceholder from './imageUrlToPlaceholder'
import transformImageUrl from './transformImageUrl'
import * as srcset from 'srcset'
import fetch from 'node-fetch'
import * as fs from 'fs'

import isAbsoluteUrl from './isAbsoluteUrl'

const getRemoteFileSize = async (url) => {
  const res = await fetch(url, { method: 'HEAD' })
  const size = await res.headers.get('content-length')
  return parseInt(size)
}

const getFileSize = async (url) => {
  try {
    return isAbsoluteUrl(url) ? await getRemoteFileSize(url) : fs.statSync(url).size;
  } catch (e) {
    console.warn(`Could\'t get file size for ${url}`)
    return 0
  }
}


const manipulateImage = async (image, { dir, paletteSize, filePath, replaceThreshold }) => {
  const imgSrc = image.getAttribute('src')
  const imgSrcset = image.getAttribute('srcset')
  const transformedImgSrc = imgSrc ? transformImageUrl(imgSrc, dir, filePath) : null;
  const imgFileSize = transformedImgSrc ? await getFileSize(transformedImgSrc) : 0;
  const updatedSrc = transformedImgSrc && imgFileSize > replaceThreshold ? await imageUrlToPlaceholder(transformedImgSrc, paletteSize) : null;

  if (updatedSrc) {
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

  if (updatedImgSrcset) {
    image.setAttribute('srcset', updatedImgSrcset)
    image.setAttribute('data-lazy-srcset', imgSrcset)
  }

  const ret = [
    transformedImgSrc && updatedSrc && imgFileSize ? { url: transformedImgSrc, fileSize: imgFileSize } : null,
    ...(imgSrscetParsedUrlsTransformed && updatedImgSrcset ? imgSrscetParsedUrlsTransformed.map(({ url, fileSize }) => { url, fileSize }) : [])
  ]

  return ret.filter(item => item)
}
export default manipulateImage