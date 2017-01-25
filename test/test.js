var expect = require('chai').expect;
var XUnitReportParser = require('../src/index');

describe('XUnitReportParser', function() {

    let parser;

    beforeEach(function() {
        parser = new XUnitReportParser();
    });

    it('should convert single digits', function() {
        let result = parser.format(1);
        expect(result).to.equal('1');
    });

    it('can parse a file', function() {
        let result = parser.parseFile(__dirname + '/../reports/example1.xml');
        expect(result.summary.name).to.equal('Mocha Tests');
        expect(result.successes().length).to.equal(90);
        expect(result.failures().length).to.equal(1);
    });

    it('fails so the other tests can have a failing test to check against', function() {
        expect(1).to.equal(0);
    });
});
