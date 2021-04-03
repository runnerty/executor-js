<p align="center">
  <a href="http://runnerty.io">
    <img height="257" src="https://runnerty.io/assets/header/logo-stroked.png">
  </a>
  <p align="center">Smart Processes Management</p>
</p>

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]
<a href="#badge">
<img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg">
</a>

# JS executor for [Runnerty]:

Module for the execution of JS through a child process of nodejs (fork).

### Installation:

```bash
npm i @runnerty/executor-js
```

You can also add modules to your project with [runnerty-cli]

```bash
npx runnerty-cli add @runnerty/executor-js
```

This command installs the module in your project, adds example configuration in your `config.json` and creates an example plan of use.

If you have installed [runnerty-cli] globally you can include the module with this command:

```bash
rty add @runnerty/executor-js
```

### Configuration:

Add in [config.json]:

```json
{
  "id": "js_default",
  "type": "@runnerty-executor-js"
}
```

```json
{
  "id": "js_default",
  "type": "@runnerty-executor-js",
  "timeout": true,
  "debug": true
}
```

### Plan:

Add in [plan.json]:

In case the script contains only one function, it is not necessary to specify it. Don't forget to include this in your script: `module.exports = function_name`.

```json
{
  "id": "js_default",
  "script": "./js/sample.js"
}
```

If your script contains several exported functions you must indicate the function to execute. Don't forget to include this in your script for each of the functions you want to export: `module.exports.functionSample = functionSample`.

```json
{
  "id": "js_default",
  "script": "./js/sample.js",
  "function": "functionSample"
}
```
In the `parameters` property you can indicate any type/value you expect in your function.
```json
{
  "id": "js_default",
  "script": "./js/sample.js",
  "function": "functionSample",
  "parameters": 123
}
```
```json
{
  "id": "js_default",
  "script": "./js/sample.js",
  "function": "functionSample",
  "parameters": {
    "id": "X123",
    "name": "Runnerty"
  }
}
```

### Output (Process values):

#### Standard

- `PROCESS_EXEC_DATA_OUTPUT`: Output data (JSON or String)
- `PROCESS_EXEC_ERR_OUTPUT`: Error output message.

#### Extra

In case your function returns an object or an array of objects, you can also access each of the values individually.

For example, if your function returns this object:
```json
{ "id": 1, "name": "mokka" }
```
You can access the values with the `GETVALUE` function indicating the key: `@GV(PROCESS_EXEC_ID)`, `@GV(PROCESS_EXEC_NAME)`

Si su función devuelve este array de objeto:
```json
[
  { "id": 1, "name": "mokka" },
  { "id": 2, "name": "cleo" },
  { "id": 3, "name": "nela" }
]
```
You can access the values with the `GETVALUE` function indicating the position and the key: `@GV(PROCESS_EXEC_0_ID)`, `@GV(PROCESS_EXEC_0_NAME)`


[runnerty]: http://www.runnerty.io
[downloads-image]: https://img.shields.io/npm/dm/@runnerty/executor-js.svg
[npm-url]: https://www.npmjs.com/package/@runnerty/executor-js
[npm-image]: https://img.shields.io/npm/v/@runnerty/executor-js.svg
[config.json]: http://docs.runnerty.io/config/
[plan.json]: http://docs.runnerty.io/plan/
[runnerty-cli]: https://www.npmjs.com/package/runnerty-cli
