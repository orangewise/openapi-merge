var merge = require('lodash.merge');
var fs = require('fs');
var glob = require('glob');
var mergedApiFile = 'api.json';
var $RefParser = require('json-schema-ref-parser');
var sortObj = require('sort-object');
var program = require('./lib/program');

// Parse command line options...
var opts = program.options();

var fileContents = function (file, cb) {
  $RefParser.dereference(file, function (e, r) {
    if (e) return cb(e);
    return cb(null, r);
  });
};

var readFiles = function (pattern, cb) {
  var mergedApi = {};
  glob(pattern, function (e, files) {
    var fileCount = files.length;
    var cnt = 0;
    files.forEach(function (file) {
      // var part = require(file)
      fileContents(file, function (e, r) {
        if (e) return cb(e);
        mergedApi = merge(mergedApi, r);
        cnt++;
        if (cnt === fileCount) {
          console.log('%s files read (%s)', cnt, files);
          return cb(null, mergedApi);
        }
      })
    });
  });
}

var writeToFile = function (mergedApiFile, mergedApi) {
  fs.writeFile(mergedApiFile, JSON.stringify(mergedApi, null, 2), function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Saved as', mergedApiFile);
    }
  });
}

readFiles('./src/api-*', function (e, r) {
  var sorted = sortObj(r, {keys: ['swagger', 'info', 'basePath', 'paths', 'x-a127-services', 'definitions']});
  if (opts.output === 'yaml') {
    console.log('convert to yaml');
  }
  writeToFile(mergedApiFile, sorted);
});
