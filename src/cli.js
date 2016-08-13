import program from 'commander';
import pkg from './../package.json';
import pify from 'pify';
import {copy} from 'copy-paste';
import {getByName, getByFile} from './';

program.version(pkg.version)
  .description('Get the dependencies of a package.json')
  .usage('[options] [path]')
  .option('-m, --module <name>', 'Get the package.json of a npm module');

module.exports = argv => {
  program
    .parse(argv);

  if (program.module) {
    return getByName(program.module)
      .then(result => {
        console.log(result);
        pify(copy)(result)
          .then(console.log('Copied to clipboard!'));
      })
      .catch(err => console.error('Could not retrieve the requested package.json file', err));
  }

  return getByFile(program.args.shift() || process.cwd())
    .then(result => {
      console.log(result);
      pify(copy)(result)
        .then(console.log('Copied to clipboard!'));
    })
    .catch(err => console.error('Could not read the required file', err));
};
