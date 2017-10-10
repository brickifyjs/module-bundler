# Module Bundler

Simplistic CommonJS module bundler

License: MIT

Forked: https://github.com/MithrilJS/mithril.js

> Can be used with [Module require for browser](https://github.com/brickifyjs/module-require) in order to use CommonJS in the browser \
Can be used with [Module require alias](https://github.com/brickifyjs/module-require-alias) in order to use alias without dependency.


## Statistics

[![Github All Releases](https://img.shields.io/github/downloads/brickifyjs/module-bundler/total.svg?style=flat-square)](https://github.com/brickifyjs/module-bundler)
[![npm](https://img.shields.io/npm/dt/@brickify/m-bundler.svg?style=flat-square)](https://www.npmjs.com/package/@brickify/m-bundler)

## Social
[![GitHub forks](https://img.shields.io/github/forks/brickifyjs/module-bundler.svg?label=Fork&style=flat-square)](https://github.com/brickifyjs/module-bundler)
[![GitHub stars](https://img.shields.io/github/stars/brickifyjs/module-bundler.svg?label=Stars&style=flat-square)](https://github.com/brickifyjs/module-bundler)
[![GitHub watchers](https://img.shields.io/github/watchers/brickifyjs/module-bundler.svg?label=Watch&style=flat-square)](https://github.com/brickifyjs/module-bundler)
[![Gitter](https://img.shields.io/gitter/room/brickifyjs/module-bundler.svg?style=flat-square)](https://gitter.im/brickifyjs/module-bundler)

## Project Health

[![Travis branch](https://img.shields.io/travis/brickifyjs/module-bundler/master.svg?style=flat-square)](https://travis-ci.org/brickifyjs/module-bundler)
[![Codecov](https://img.shields.io/codecov/c/github/brickifyjs/module-bundler.svg?style=flat-square)](https://codecov.io/gh/brickifyjs/module-bundler)
[![bitHound](https://img.shields.io/bithound/dependencies/github/brickifyjs/module-bundler.svg?style=flat-square)](https://www.bithound.io/github/brickifyjs/module-bundler/master/dependencies/npm)
[![bitHound](https://img.shields.io/bithound/devDependencies/github/brickifyjs/module-bundler.svg?style=flat-square)](https://www.bithound.io/github/brickifyjs/module-bundler/master/dependencies/npm)
[![Website](https://img.shields.io/website/https/m-bundler.js.brickify.io.svg?label=website&style=flat-square)](https://m-bundler.js.brickify.io)

## About

This bundler attempts to aggressively bundle CommonJS modules by assuming the dependency tree is static, similar to what Rollup does for ES6 modules.

Most browsers don't support ES6 `import/export` syntax, but we can achieve modularity by using CommonJS module syntax and employing [`module.js`](https://github.com/brickifyjs/module-require) in browser environments.

Webpack is conservative and treats CommonJS modules as non-statically-analyzable since `require` and `module.exports` are legally allowed everywhere. Therefore, it must generate extra code to resolve dependencies at runtime (i.e. `__webpack_require()`). Rollup only works with ES6 modules. ES6 modules can be bundled more efficiently because they are statically analyzable, but some use cases are difficult to handle due to ES6's support for cyclic dependencies and hosting rules. This bundler assumes code is written in CommonJS style but follows a strict set of rules that emulate statically analyzable code and favors the usage of the factory pattern instead of relying on obscure corners of the Javascript language (hoisting rules and binding semantics).

### Caveats

- Only supports modules that have the `require` and `module.exports` statement declared at the top-level scope before all other code, i.e. it does not support CommonJS modules that rely on dynamic importing/exporting. This means modules should only export a pure function or export a factory function if there are multiple statements and/or internal module state. The factory function pattern allows easier dependency injection in stateful modules, thus making modules testable.
- Changes the semantics of value/binding exporting between unbundled and bundled code, and therefore relying on those semantics is discouraged. Instead, it is recommended that module consumers inject dependencies via the factory function pattern
- Top level strictness is infectious (i.e. if entry file is in `"use strict"` mode, all modules inherit strict mode, and conversely, if the entry file is not in strict mode, all modules are pulled out of strict mode)
- Currently only supports assignments to `module.exports` (i.e. `module.exports.foo = bar` will not work)
- It is tiny and dependency-free because it uses regular expressions, and it only supports the narrow range of import/export declaration patterns outlined above.

## TODO
* Add before and after compilation
* Add LICENSE comment for each dependencies

## Install

```bash
$ npm install @brickify/m-bundler -g
```

## Usage

### CLI

```bash
$ @brickify/m-bundler src/index.js -o bundle.js
```

### NodeJS

```js
var bundle = require("./cjsbundle");

bundle("src/index.js", "bundle.js", {
	w: true, // Watch files
	m: true, // Minify
	a: true // Aggressive mode
});
```

### OPTIONS
* `-o` Output path
* `-w` Watch files changes
* `-m` Minify bundle
* `-a` Bundle using aggressive mode 
