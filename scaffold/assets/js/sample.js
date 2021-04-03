'use strict';

const sleep = require('util').promisify(setTimeout);

async function funcObject(input) {
  await sleep(1000);
  return { score: 50 + input.increment };
}
module.exports.funcObject = funcObject;

function funcString(input) {
  return 'HI ' + input.name || '' + '!';
}
module.exports.funcString = funcString;

function funcArrayObjects() {
  return [
    { id: 1, name: 'mokka' },
    { id: 2, name: 'cleo' },
    { id: 3, name: 'nela' }
  ];
}
module.exports.funcArrayObjects = funcArrayObjects;
