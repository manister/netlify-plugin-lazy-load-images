const path = require('path')

const resolveImagePath = (rootDir, filePath, srcPath) =>
  path.join(
    rootDir,
    path.resolve(
      path.join(
        '/',
        path.dirname(
          path.relative(
            rootDir,
            filePath))
      ),
      srcPath
    )
  )

module.exports = resolveImagePath