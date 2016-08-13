import _ from 'lodash';
import pify from 'pify';
import jsonfile from 'jsonfile';
import arrify from 'arrify';
import fetchPackage from 'package-json';

const formatData = data => arrify(_.keys(data.dependencies).concat(_.keys(data.devDependencies)));

export function getByFile (filePath) {
  return pify(jsonfile).readFile(`${filePath}/\//package.json`)
    .then(formatData);
}

export function getByName (name) {
  return fetchPackage(name, 'latest')
    .then(result => formatData(result));
}
