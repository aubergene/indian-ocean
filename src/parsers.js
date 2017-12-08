import { setParser } from '../index';

export default function addParsers() {
    try {
        setParser('.csv', require('d3-dsv').csvParse)
        setParser('.csv', require('d3').csvParse)
        setParser('.csv', require('d3').csv.parse) // for < d3#v4
    } catch (e) {  /* No CSV parser found */  }
    
    try {
        setParser('.tsv', d => d.split('\n').filter(d => d).map(d => d.split('\t')))
    } catch (e) {  /* No TSV parser found */  }

}

