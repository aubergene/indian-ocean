import { setParser } from './index'

var tryLoad = function (libName, fn) {
  try {
    var lib = require(libName)
    fn(lib)
  } catch (e) { }
}

function addParsers () {
  tryLoad('d3-dsv', (dsv) => {
    setParser('csv', dsv.csvParse)
    setParser('tsv', dsv.tsvParse)
    setParser('psv', dsv.dsvFormat('|').parse)
  })

  tryLoad('d3', (d3) => {
    setParser('csv', d3.csvParse || d3.csv.parse)
    setParser('tsv', d3.tsvParse || d3.tsv.parse)
    setParser('psv', d3.dsvFormat ? d3.dsvFormat('|').parse : d3.dsv('|').parse)
  })

  tryLoad('archieml', (archieml) => {
    setParser('aml', archieml.load)
  })

  tryLoad('js-yaml', (yaml) => {
    setParser('yaml', yaml.safeLoad)
  })

  tryLoad('parsedbf', (parsedbf) => {
    setParser('dbf', parsedbf)
  })
}

function loader (fn) {
  tryLoad = fn
}

export { addParsers, loader }
