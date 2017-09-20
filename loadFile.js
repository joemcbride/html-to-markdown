const fs = require('fs')
const path = require('path')

module.exports = (file)=> {
  return new Promise((resolve, reject)=> {
    const targetFile = path.resolve(file)

    fs.readFile(targetFile, (error, data)=> {
      if(error) {
        reject(error)
        return
      }
      resolve(data)
    })
  })
}
