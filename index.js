'use strict';

const ms = require('ms');
const sleep = require('util').promisify(setTimeout);
const path = require('path');
const { fork } = require('child_process');

const Executor = require('@runnerty/module-core').Executor;

class jsExecutor extends Executor {
  constructor(process) {
    super(process);
    this.forked = fork(path.join(__dirname, 'child.js'));
    this.response = '';
    this.timeoutExceeded = false;
  }

  exec(params) {
    this.forked.on('message', msg => {
      this.response = msg;
    });

    this.forked.on('error', error => {
      this.endFail(error);
    });

    this.forked.on('CLOSE', code => {
      this.endFail('Closed', code);
    });

    this.forked.on('exit', code => {
      if (code === 1) {
        this.endFail();
      } else {
        const endOptions = { end: 'end' };
        endOptions.data_output = this.response || '';
        if (this.response instanceof Object) {
          endOptions.extra_output = this.response;
        }
        this.end(endOptions);
      }
    });

    const _params = {
      script: path.resolve(params.script),
      function: params.function || '',
      parameters: params.parameters,
      debug: params.debug || false
    };

    if (this.forked.connected) {
      this.forked.send(_params);
      this.startTimeout(params.timeout);
    } else {
      this.endFail(`Connection to ${_params.script} could not be established.`);
    }
  }

  async startTimeout(time) {
    if (ms('' + time) > 0) {
      await sleep(ms('' + time));
      if (this.forked.connected) {
        this.timeoutExceeded = true;
        this.forked.kill();
      }
    }
  }

  endFail(error) {
    const endOptions = { end: 'error' };
    endOptions.messageLog = error || this.response || '';
    endOptions.err_output = error || this.response || '';
    // Timeout Exceeded:
    if (this.timeoutExceeded) {
      endOptions.err_output = 'Timeout Exceeded. ' + endOptions.err_output;
      endOptions.messageLog = 'Timeout Exceeded. ' + endOptions.messageLog;
    }
    this.end(endOptions);
  }
}

module.exports = jsExecutor;
