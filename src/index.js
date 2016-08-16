import _ from 'lodash';
import pify from 'pify';
import jsonfile from 'jsonfile';
import fetchPackage from 'package-json';

const formatData = data => _.keys(data.dependencies).concat(_.keys(data.devDependencies));

export function getByFile (filePath) {
  return pify(jsonfile).readFile(filePath)
    .then(formatData);
}

export function getByName (name) {
  return fetchPackage(name, 'latest')
    .then(formatData);
}
