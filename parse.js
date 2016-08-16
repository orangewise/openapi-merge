var $RefParser = require('json-schema-ref-parser');
var YAML = require('json2yaml');
var fs = require('fs');

$RefParser.dereference('./api-cors.json', function(err, schema) {
  if (err) {
    console.error(err);
  }
  else {
    console.log(schema);
  }
});


$RefParser.dereference('./api.yml', function(err, schema) {
  if (err) {
    console.error(err);
  }
  else {
    console.log(schema);
  }
});


var api = require('./api.json');
var apiYaml = './api.yml';
fs.writeFile(apiYaml, YAML.stringify(api), function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Saved as', apiYaml);
  }
});
