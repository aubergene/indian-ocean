import { addParsers } from './src/parsers'
addParsers()

export {
    version,
    extname,
    getParser,
    setParser,
    readData,
    readDataSync
} from './src/index'
