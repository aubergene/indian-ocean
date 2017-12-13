import * as io from './src/index'
import { loader, addParsers } from './src/parsers'

loader((libName, fn) => {
  if (window[libName]) {
    fn(window[libName])
  }
})

addParsers()

export {
    version,
    extname,
    getParser,
    setParser,
    readData,
    readDataSync
} from './src/index'
