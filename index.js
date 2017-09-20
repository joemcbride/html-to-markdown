const path = require('path')
const { mkdir, rm, test } = require('shelljs')
const toMarkdown = require('to-markdown')

const loadFile = require('./loadFile')
const saveFile = require('./saveFile')
const converters = require('./converters')
const downloadFile = require('./downloadFile')

let config = {
  saveDir: '',
  downloadingFiles: []
}

const imgConverter = {
  filter: 'img',
  replacement: (content, node) => {
    const alt = node.alt || ''
    let src = node.getAttribute('src') || ''

    if(src) {
      const origSrc = src
      const newFileName = `image${config.downloadingFiles.length}.jpg`
      const newFilePath = path.resolve(path.join(config.saveDir, newFileName))
      src = newFileName
      config.downloadingFiles.push(downloadFile(origSrc, newFilePath))
    }

    return src ? `![${alt}](${src})` : ''
  }
}

function transformFile(data) {
  return new Promise((resolve, reject)=> {
    const result = toMarkdown(
      data.toString(),
      {
        gfm: true,
        converters: converters.concat(imgConverter)
      })

    resolve(result)
  })
}

function createFolders(rootDir, fileDir) {
  if(!test('-e', rootDir)) {
    mkdir(rootDir)
  }

  if (test('-e', fileDir)) {
    rm('-rf', fileDir)
  }

  mkdir(fileDir)
}

function createConfig(fileName) {

  const outputDirectory = path.resolve('./output') //path.dirname(path.resolve(fileName))
  const baseName = path.basename(fileName)
  const folderName = baseName.substr(0, baseName.lastIndexOf('.'))
  const fileSaveDir = path.join(outputDirectory, folderName)
  const saveFileName = path.join(fileSaveDir, folderName + '.md')

  return {
    rootDir: outputDirectory,
    saveDir: fileSaveDir,
    saveFileName: saveFileName,
    downloadingFiles: []
  }
}

const args = process.argv.slice(2);

if(args.length == 0) {
  console.error('A file name is required. ex: ./files/file1.html')
  return
}

const fileName = args[0]

if(!test('-e', path.resolve(fileName))) {
  console.error(`\nCould not find file '${fileName}'\n`)
  return
}

config = createConfig(fileName)
createFolders(config.rootDir, config.saveDir)

console.log('Writing output to ' + config.saveDir)

loadFile(fileName)
  .then(file => transformFile(file.toString()))
  .then(content => saveFile(config.saveFileName, content))
  .then(() => console.log(`Wrote markdown file, downloading ${config.downloadingFiles.length} files...`))
  .then(() => Promise.all(config.downloadingFiles))
  .then(() => console.log('Done downloading files'))
