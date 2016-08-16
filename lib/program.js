var argv = require('minimist')(process.argv.slice(2));


exports.options = function () {

  var options = {};

  if (argv.help) {
    console.log('usage: node index -o yaml');
    process.exit(0);
  };

  options.output = (argv.o === 'yaml')
    ? 'yaml'
    : 'json';

  return options;

};
