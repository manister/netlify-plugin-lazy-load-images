const isAbsoluteUrl = (url: string) => {
  const r = new RegExp('^(?:[a-z]+:)?//', 'i');
  return r.test(url)
}

export default isAbsoluteUrl
