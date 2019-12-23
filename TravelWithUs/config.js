// conf.js
var dateFormat = require('dateformat');

exports.config = {
    framework: 'jasmine',
    // The address of a running selenium server.
    seleniumAddress: 'http://localhost:4444/wd/hub',

    specs: ['Testcases/RegisterTest.ts'],
    //run directly with browser driver without using webdriver manager
    //directConnect: true,
    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            'args': ['--start-maximized']
        }
    },
    restartBrowserBetweenTests: true,
    params: { // define global variable
        appURL: 'http://travelwithus.asia/',
        user: 'ptvanh@mailinator.com', 
        pass: '123456'
    },
    onPrepare: function() {
        require('ts-node').register({
          project: require('path').join(__dirname, './tsconfig.json')
        })
        var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
        //var SpecReporter = require('jasmine-spec-reporter');
        jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'all'}));

        var HtmlReporter = require('protractor-beautiful-reporter');
        // Add a screenshot reporter and store screenshots to `/tmp/screenshots`:
        jasmine.getEnv().addReporter(new HtmlReporter({
            //baseDirectory: 'tmp/screenshots'
            baseDirectory: __dirname + '\\TestReports\\' + dateFormat(new Date(), "dddd_mmmm_dS_yyyy_h_MM_ss_TT")
        }).getJasmine2Reporter());

        // var jasmineReporters = require('jasmine-reporters');
        // jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
        //     consolidateAll: true,
        //     savePath: './',
        //     filePrefix: 'xmlresults'
        // }));
        // var fs = require('fs-extra');
 
        // fs.emptyDir('screenshots/', function (err) {
        //     console.log(err);
        // });
    
        // jasmine.getEnv().addReporter({
        //     specDone: function(result) {
        //         if (result.status == 'failed') {
        //             browser.getCapabilities().then(function (caps) {
        //                 var browserName = caps.get('browserName');
    
        //                 browser.takeScreenshot().then(function (png) {
        //                     var stream = fs.createWriteStream('screenshots/' + browserName + '-' + result.fullName+ '.png');
        //                     stream.write(new Buffer(png, 'base64'));
        //                     stream.end();
        //                 });
        //             });
        //         }
        //     }
        // });

        // Add a screenshot reporter and store screenshots to `/tmp/screenshots`: 
        return browser.takeScreenshot();
    },
    SELENIUM_PROMISE_MANAGER: false,
    //HTMLReport called once tests are finished
    onComplete: function() {
        
        var HtmlReporter = require('protractor-beautiful-reporter');
        var path = require('path');
        var reporter = new HtmlReporter({
            //baseDirectory: '/tmp/screenshots'
            baseDirectory: __dirname + '\\TestReports\\' + dateFormat(new Date(), "dddd_mmmm_dS_yyyy_h_MM_ss_TT")
            , pathBuilder: function pathBuilder(spec, descriptions, results, capabilities) {
                // Return '<browser>/<specname>' as path for screenshots:
                // Example: 'firefox/list-should work'.
                return path.join(capabilities.caps_.browser, descriptions.join('-'));
            }
            , screenshotsSubfolder: 'images'
            , docTitle: 'my reporter'
            , sortFunction: function sortFunction(a, b) {
            if (a.cachedBase === undefined) {
                var aTemp = a.description.split('|').reverse();
                a.cachedBase = aTemp.slice(0).slice(0,-1);
                a.cachedName = aTemp.slice(0).join('');
            };
            if (b.cachedBase === undefined) {
                var bTemp = b.description.split('|').reverse();
                b.cachedBase = bTemp.slice(0).slice(0,-1);
                b.cachedName = bTemp.slice(0).join('');
            };
        
            var firstBase = a.cachedBase;
            var secondBase = b.cachedBase;
        
            for (var i = 0; i < firstBase.length || i < secondBase.length; i++) {
        
                if (firstBase[i] === undefined) { return -1; }
                if (secondBase[i] === undefined) { return 1; }
                if (firstBase[i].localeCompare(secondBase[i]) === 0) { continue; }
                return firstBase[i].localeCompare(secondBase[i]);
            }
        
            var firstTimestamp = a.timestamp;
            var secondTimestamp = b.timestamp;
        
            if(firstTimestamp < secondTimestamp) return -1;
            else return 1;
            }
         });
    },
    // multiCapabilities: [{
    //   browserName: 'firefox'
    // }, {
    //   browserName: 'chrome'
    // }],
    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true, // Use colors in the command line report.
    }
  }
