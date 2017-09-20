const http = require('http')
const fs = require('fs')

module.exports = (url, saveFile) => {
  // console.log(`Downloading ${url} to ${saveFile}`)
  return new Promise((resolve, reject)=> {
    var file = fs.createWriteStream(saveFile)
    var request = http.get(url, function(response) {
      response.pipe(file)
      file.on('finish', function() {
        file.close(resolve)
      });
    }).on('error', function(err) {
      fs.unlink(saveFile)
      reject(err)
    });
  })
}
