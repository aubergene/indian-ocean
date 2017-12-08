import { version } from './package.json';
import { extname } from 'path'
import fs from 'fs-extra'

import addParsers from './src/parsers'

var parsers = {
    json: JSON.parse,
    txt: d => d
}

addParsers()

function getParser(f) {
    return parsers[extname(f).slice(1)] || parsers.txt
}

function setParser(ext, parser) {
    ext = ext.replace(/^\./, '')
    if (parser) {
        parsers[ext] = parser
    } else {
        delete(parsers[ext])
    }
}

async function readData(path, options='utf8') {
    var parser = getParser(path)
    var data = await fs.readFile(path, options)
    return parser(data)
}

function readDataSync(path, options='utf8') {
    var parser = getParser(path)
    var data = fs.readFileSync(path, options)
    return parser(data)
}

export {
    version,
    getParser,
    setParser,
    readData,
    readDataSync
}
