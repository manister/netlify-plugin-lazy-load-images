const isAbsoluteUrl = (url) => {
  const r = new RegExp('^(?:[a-z]+:)?//', 'i');
  return r.test(url)
}

module.exports = isAbsoluteUrl
