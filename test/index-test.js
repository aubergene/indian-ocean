var fs = require('fs');
var path = require('path');
var assert = require('assert');
var fs = require('fs-extra');
var io = require('../');

describe('indian-ocean', function () {
    beforeEach(function () {
        return fs.emptyDir('test/output');
    });

    describe('extname', function () {
        it('return the file extension', function () {
            assert.equal('.txt', io.extname('test/input/foo.txt'));
            assert.equal('.html', io.extname('test/input/foo.ejs.html'));
            assert.equal('', io.extname('test/input/foo'));
        });
    })

    describe('readData', function () {
        it('reads plain text', function () {
            return io.readData('test/input/foo.txt')
            .then(function (data) {
                assert.equal(data, fs.readFileSync('test/input/foo.txt', 'utf-8'));
            });
        });

        it('reads with options', function () {
            return io.readData('test/input/foo.txt', { encoding: null })
            .then(function (data) {
                assert.deepEqual(data, fs.readFileSync('test/input/foo.txt'));
            });
        });

        it('reads JSON', function () {
            return io.readData('test/input/foo.json')
            .then(function (data) {
                assert.deepEqual(data, JSON.parse(fs.readFileSync('test/input/foo.json', 'utf-8')));
            });
        });

        it('reads CSV as plain text without a parser', function () {
            io.setParser('.csv', null)

            return io.readData('test/input/foo.csv')
                .then(function (data) {
                    assert.equal(data, fs.readFileSync('test/input/foo.csv', 'utf-8'));
                });
        });

        it('reads CSV as data when d3.csvParse is set as .csv parser', function () {
            var csvParse = require('d3-dsv').csvParse
            io.setParser('.csv', csvParse)

            return io.readData('test/input/foo.csv')
                .then(function (data) {
                    assert.deepEqual(data, csvParse(fs.readFileSync('test/input/foo.csv', 'utf-8')));
                });
        });

        it('reads TSV', function () {
            return io.readData('test/input/foo.tsv')
                .then(function (data) {
                    // TODO make TSV sensible
                    assert.deepEqual(JSON.stringify(data), JSON.stringify([{name:'apple', price:'1'},{name:'grape',price:'2'}]));
                });
        });

        // it('reads PNG', function () {
        //     return io.readData('test/input/foo.png', "binary")
        //         .then(function (data) {
        //             // TODO make TSV sensible
        //             console.log(JSON.stringify(data, null, 2))
        //             assert.deepEqual(data, "wooo");
        //         });
        // });

        it('reads plain text synchronously', function () {
            var data = io.readDataSync('test/input/foo.txt')
            assert.equal(data, fs.readFileSync('test/input/foo.txt', 'utf-8'));
        });

        it('reads JSON synchronously', function () {
            var data = io.readDataSync('test/input/foo.json')
            assert.deepEqual(data, JSON.parse(fs.readFileSync('test/input/foo.json', 'utf-8')));
        });
    });

})