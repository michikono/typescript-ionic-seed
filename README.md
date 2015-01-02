Overview
========

This is a seed for an Ionic/TypeScript setup. Features of this project:

* All Angular/Ionic code using TypeScript
* Ready to go for use in Ionic
* Gulp instead of Grunt (some may debate this choice)
* Examples hand-written TypeScript `.d.ts` files (in `src/definitions`) as well as `tsd` files
* Angular portion of project is using the feature pattern where files are organized by feature instead of type (this is considered a best-practice)
* The convention used for $scope variable assignment prevents primitives from being assigned (this avoids many bugs; see http://zcourts.com/2013/05/31/angularjs-if-you-dont-have-a-dot-youre-doing-it-wrong/)
* `tslint` installed and runs on each TypeScript compilation!
* Comprehensive `.gitignore` and `.jshintrc`
* Uses notifications for most errors
* Unlike most other seeds, this one also includes test examples files
* Everything uses source maps so failing tests and broken code will show you the `.ts` file that is causing it

Setup
=====

This setup requires npm and xcode to be installed.

```bash
npm install -g typescript
npm install tsd@next -g
npm install -g gulp
npm install -g ionic
npm install -g bower
npm install
bower install
tsd reinstall --overwrite
gulp
ionic platform add ios
```

Development
===========

To compile SASS:

```bash
gulp sass
```

To compile TypeScript files:

```bash
gulp ts
```

To run tests (requires the `ts` job to have been run successfully):

```bash
gulp test
```

To enable automatic SASS compilation, TypeScript compilation, and test running:

```bash
gulp watch
```

*Do not enable IDE compilation of TypeScript as the gulp watcher will handle this for you.*

Adding dependencies
-----------------------

* For TSDs (to have TypeScript detection), use `tsd install <package> --save`
* For bower (things used in the browser), use `bower install <package> --save`
* For npm (things used to build stuff), use `npm install <package> --save-dev`
* For 3rd party, non-TSD definitions, placed them in `lib/definitions/`

Runing the application
======================

Web
---

```bash
gulp
ionic serve
```

iPhone
------

```bash
ionic build ios
ionic emulate ios
```

Distribution
============

TODO


Notes
=====

* The codebase uses many best practices found [here](https://github.com/johnpapa/angularjs-styleguide) such as the [folders-by-feature-structure](https://github.com/johnpapa/angularjs-styleguide#folders-by-feature-structure) and [module](https://github.com/johnpapa/angularjs-styleguide#many-small-self-contained-modules) patterns
* The `module` syntax is used to create actual TypeScript modules -- code inside a module is scoped to it. Each feature folder uses its own module name and the shared scope is used in the unit tests to access the declarations without requiring verbose prefixes.
* The `angular.module` syntax is an Angular thing for componentizing code. To avoid confusion, wherever possible, the two types of module references should be the same in a file/feature.
* You will need to add new `src/**/.ts` files to `src/definitions.d.ts` to ensure the TypeScript compiler doesn't get confused (see next caveat)
* When creating interfaces, you can declare them by prefixing the `module` declaration with `declare` (http://stackoverflow.com/questions/17635033/error-ts1046-declare-modifier-required-for-top-level-element).
* The gulp task maintains `src/generated.definitions.d.ts` for you. Thanks to this, no further work is necessary when bootstrapping tests.