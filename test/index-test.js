var fs = require('fs');
var path = require('path');
var assert = require('assert');
var fs = require('fs-extra');
var so = require('../');

describe('sandy-ocean', function () {
    beforeEach(function () {
        return fs.emptyDir('test/output');
    });

    describe('readData', function () {
        it('reads plain text', function () {
            return so.readData('test/input/foo.txt')
            .then(function (data) {
                assert.equal(data, fs.readFileSync('test/input/foo.txt', 'utf-8'));
            });
        });
        
        it('reads with options', function () {
            return so.readData('test/input/foo.txt', { encoding: null })
            .then(function (data) {
                assert.deepEqual(data, fs.readFileSync('test/input/foo.txt'));
            });
        });
        
        it('reads JSON', function () {
            return so.readData('test/input/foo.json')
            .then(function (data) {
                assert.deepEqual(data, JSON.parse(fs.readFileSync('test/input/foo.json', 'utf-8')));
            });
        });
        
        it('reads CSV as plain text without a parser', function () {
            so.setParser('.csv', null)

            return so.readData('test/input/foo.csv')
                .then(function (data) {
                    assert.equal(data, fs.readFileSync('test/input/foo.csv', 'utf-8'));
                });
        });

        it('reads CSV as data when d3.csvParse is set as .csv parser', function () {
            var csvParse = require('d3-dsv').csvParse
            so.setParser('.csv', csvParse)

            return so.readData('test/input/foo.csv')
                .then(function (data) {
                    assert.deepEqual(data, csvParse(fs.readFileSync('test/input/foo.csv', 'utf-8')));
                });
        });

        it('reads TSV', function () {
            return so.readData('test/input/foo.tsv')
                .then(function (data) {
                    // TODO make TSV sensible
                    assert.deepEqual(data, [['name','price'],['apple','1'],['grape','2']]);
                });
        });

        it('reads plain text synchronously', function () {
            var data = so.readDataSync('test/input/foo.txt')
            assert.equal(data, fs.readFileSync('test/input/foo.txt', 'utf-8'));
        });
        
        it('reads JSON synchronously', function () {
            var data = so.readDataSync('test/input/foo.json')
            assert.deepEqual(data, JSON.parse(fs.readFileSync('test/input/foo.json', 'utf-8')));
        });
    });

})