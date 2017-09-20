const http = require('http')
const fs = require('fs')

module.exports = (url, saveFile) => {
  // console.log(`Downloading ${url} to ${saveFile}`)
  return new Promise((resolve, reject)=> {
    var file = fs.createWriteStream(saveFile)
    var request = http.get(url, function(response) {
      response.pipe(file)
      file.on('finish', function() {
        file.close(resolve)  // close() is async, call cb after close completes.
      });
    }).on('error', function(err) { // Handle errors
      fs.unlink(dest) // Delete the file async. (But we don't check the result)
      reject(err)
    });
  })
}
