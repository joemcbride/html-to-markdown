const fs = require('fs')
const path = require('path')

module.exports = (file, content) => {
  return new Promise((resolve, reject)=> {
    const newFile = path.resolve(file)

    fs.writeFile(newFile, content, function (writeError) {
      if (writeError) {
        reject(writeError)
        return
      }
      resolve()
    })
  })
}
