const fs = require('fs');
const xml2js = require('xml2js');

class XUnitReportResult {
    constructor(data) {
        this.summary = data['testsuites']['$'];
        this.suites = [].concat.apply([], data['testsuites']['testsuite'].filter((tc) => {
            return tc.testcase && tc.testcase.length > 0;
        }).map(o => {
            return o.testcase.map(o1 => {
                return {
                    name: o1['$']['name'],
                    time: o1['$']['time'],
                    failure: o1['failure']
                };
            });
        }));
    }

    failures() {
        return this.suites.filter(t => t.failure !== undefined);
    }

    successes() {
        return this.suites.filter(t => t.failure === undefined);
    }
}

class XUnitReportParser {

    format(number, locale) {
        return number.toLocaleString(locale);
    }

    parseFile(file) {
        let parser = new xml2js.Parser();
        let contents = fs.readFileSync(file, 'utf8');
        let data;
        parser.parseString(contents, function(err, result) {
            if(err) {
                console.log(err);
                throw err;
            } else {
                data = result;
            }
        });
        return new XUnitReportResult(data);
    }

}

module.exports = XUnitReportParser;
