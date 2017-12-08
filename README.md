# Indian Ocean

A Node.js library that reads and writes data by guessing an appropriate parser/formatter based on file extension. 

The only dependency is [fs-extra]. On load it looks for the following libraries and if available will use them to parse these extensions:

* `.txt` returns string
* `.txt` returns `JSON.parse`
* `.csv`,`.tsv`,`.psv` Attempts to use `d3-dsv.parseCSV`, `Papa.parse`

## Installation
------------

```
npm install indian-ocean
```

## Usage

```js
var io = require('indian-ocean')
var data = io.readDataSync('test/input/foo.json') // JSON.parse is automatic

// Set the parser you'd like to use with a given extension 
io.setParser('.csv', require('d3-dsv').parseCsv)
var data = io.readDataSync('test/input/foo.csv')

var str = 'fruits,price\napple,1\npear,2'
// You can also get the parser directly
var data = io.getParser('.csv')(str)
```

## License

MIT
