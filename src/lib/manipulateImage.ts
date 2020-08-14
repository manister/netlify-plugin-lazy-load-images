import imageUrlToPlaceholder from './imageUrlToPlaceholder'
import transformImageUrl from './transformImageUrl'
import srcset from 'srcset'
import fetch from 'node-fetch'
import * as fs from 'fs';

import isAbsoluteUrl from './isAbsoluteUrl'

const getRemoteFileSize = async (url: string) => {
  const res = await fetch(url, { method: 'HEAD' })
  const size = res.headers.get('content-length')
  return size ? parseInt(size) : 0;
}

const getFileSize = async (url: string) => {
  try {
    return isAbsoluteUrl(url) ? await getRemoteFileSize(url) : fs.statSync(url).size;
  } catch (e) {
    console.warn("\x1b[31m", `Could\'t determine file size for ${url}.`, "\x1b[0m")
    return 0
  }
}



type ManipulateImageOptions = { dir: string, filePath: string, replaceThreshold: number }

const manipulateImage = async (image: HTMLElement, { dir, filePath, replaceThreshold }: ManipulateImageOptions) => {

  //for logging, capture all urls and filesizes saved:
  const reducedByLogOutput : {[filename: string] : number } = {} 

  const imgSrc = image.getAttribute('src')
  const imgSrcset = image.getAttribute('srcset')
  const transformedImgSrc = imgSrc ? transformImageUrl(imgSrc, dir, filePath) : '';
  const imgFileSize = transformedImgSrc ? await getFileSize(transformedImgSrc) : -1;
  const updatedSrc = imgFileSize > replaceThreshold ? await imageUrlToPlaceholder(transformedImgSrc) : '';
  if (imgSrc && imgFileSize > replaceThreshold) {
    reducedByLogOutput[imgSrc] = imgFileSize;
  }
  const updatedImgSrcset = imgSrcset ? srcset.stringify(
    await Promise.all(srcset.parse(imgSrcset)
      .map(async srcsetObj => {
        const transformedUrl = transformImageUrl(srcsetObj.url, dir, filePath)
        const fileSize = await getFileSize(transformedUrl)
        const url = fileSize > replaceThreshold ? await imageUrlToPlaceholder(transformedUrl) : transformedUrl
        if (fileSize > replaceThreshold) {
          reducedByLogOutput[srcsetObj.url] = fileSize;
        }
        return {
          ...srcsetObj,
          url,
        }
  }))) : '';


  if (imgSrc && updatedSrc) {
    image.setAttribute('src', updatedSrc)
    image.setAttribute('data-lazy-src', imgSrc)
  }
  if (imgSrcset && updatedImgSrcset) {
    image.setAttribute('srcset', updatedImgSrcset)
    image.setAttribute('data-lazy-srcset', imgSrcset)
  }

  return reducedByLogOutput

}
export default manipulateImage