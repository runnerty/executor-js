'use strict';

process.on('message', async params => {
  let res = '';
  try {
    const functions = require(params.script);
    if (params.function.length > 0) {
      if (typeof functions[params.function] === 'function') {
        res = await functions[params.function](params.parameters);
      } else {
        throw new Error(
          `'${params.function}' is not a function. Make sure you do 'module.exports.${params.function} = function_name' in '${params.script}'.`
        );
      }
    } else {
      if (typeof functions === 'function') {
        res = await functions(params.parameters);
      } else {
        throw new Error(`function not found. Make sure you do 'module.exports = function_name' in '${params.script}'.`);
      }
    }
    process.send(res);
    process.exit();
  } catch (err) {
    /* eslint-disable no-console */
    if (params.debug) console.error(err);
    /* eslint-enable no-console */
    process.send(err.message);
    process.exit(1);
  }
});

process.on('uncaughtException', err => {
  process.send(err.message);
  process.exit(1);
});

process.on('unhandledRejection', (reason, p) => {
  process.send(reason);
  process.exit(1);
});

process.stdin.resume();

function exitHandler() {
  process.send('Process has been killed.');
  process.exit(1);
}

process.on('SIGINT', exitHandler.bind());
process.on('SIGTERM', exitHandler.bind());
