import { version } from '../package.json'
import fs from 'fs-extra'

var parsers = {
  json: JSON.parse,
  txt: d => d
}

function extname (path) {
  const match = /\.[^.]+$/.exec(path)
  if (!match) return ''
  return match[0]
}

function getParser (f) {
  return parsers[extname(f).slice(1)] || parsers.txt
}

function setParser (ext, parser) {
  ext = ext.replace(/^\./, '')
  if (parser) {
    parsers[ext] = parser
  } else {
    delete (parsers[ext])
  }
}

async function readData (path, options = 'utf8') {
  var parser = getParser(path)
  var data = await fs.readFile(path, options)
  return parser(data)
}

function readDataSync (path, options = 'utf8') {
  var parser = getParser(path)
  var data = fs.readFileSync(path, options)
  return parser(data)
}

export {
    version,
    extname,
    getParser,
    setParser,
    readData,
    readDataSync
}
