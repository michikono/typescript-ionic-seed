Overview
========

This is a seed for an Ionic/TypeScript setup. Features of this project:

* All Angular/Ionic code using TypeScript
* Ready to go for use in Ionic
* Gulp instead of Grunt (some may debate this choice)
* The codebase uses many best practices found [here](https://github.com/johnpapa/angularjs-styleguide) such as the [folders-by-feature-structure](https://github.com/johnpapa/angularjs-styleguide#folders-by-feature-structure) and [module](https://github.com/johnpapa/angularjs-styleguide#many-small-self-contained-modules) patterns
* The convention used for `$scope` variable assignment prevents primitives from being assigned ([this avoids many bugs](http://zcourts.com/2013/05/31/angularjs-if-you-dont-have-a-dot-youre-doing-it-wrong/))
* Using `tslint` to keep code clean!
* Comprehensive `.gitignore` and `.jshintrc`
* Uses notifications for most errors and enables TDD
* Unlike most other Ioinc/Angular/folders-by-feature seeds, this one also includes test examples
* Everything uses source maps so failing tests and broken code will show you the `.ts` file that is causing it
* All Font-awesome icons working with no additional configuration!

Setup
=====

This setup requires npm and xcode to be installed.

```bash
npm install -g typescript
npm install tsd@next -g
npm install -g gulp
npm install -g ionic
npm install -g bower
npm install -g protractor
npm run setup
ionic platform add ios
```

Development
===========

To compile SASS:

```bash
npm run css
```

To compile TypeScript files:

```bash
npm run ts
```

To enable automatic SASS compilation, TypeScript compilation, and test running:

```bash
npm run watch
```

*Do not enable IDE compilation of TypeScript as the file watcher in this project will handle this for you.*

Testing
-------

To run unit tests (requires the `ts` job to have been run successfully):

```bash
npm run test
```

To run end-to-end (E2E) tests, do these two steps in order:

1. `npm run server` (starts a web server; run this just once in its own tab)
2. `npm run e2e` (runs the tests in your browser; run it repeatedly)

End-to-end tests tests are located at `src/**/*.e2e.ts`

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
npm run server
```

iPhone
------

```bash
ionic build ios
ionic emulate ios
```

Notes
=====

* The `module` syntax is used to create actual TypeScript modules -- code inside a module is scoped to it. Each feature folder uses its own module name and the shared scope is used in the unit tests to access the declarations without requiring verbose prefixes.
* The `angular.module` syntax is an Angular thing for componentizing code. To avoid confusion, wherever possible, the two types of module references should be the same in a file/feature.
* You will need to add new `src/**/.ts` files to `src/definitions.d.ts` to ensure the TypeScript compiler doesn't get confused (see next caveat); if anything breaks in your `tsd.d.ts` file, [double check the paths didn't get munged](https://github.com/DefinitelyTyped/tsd/issues/112)
* When creating interfaces in `.d.ts` files, you can declare them by [prefixing the `module` declaration with `declare`](http://stackoverflow.com/questions/17635033/error-ts1046-declare-modifier-required-for-top-level-element).
* Always assume the `www/` folder is scratch space -- including `index.html`!
* Place images, fonts, scss, etc. in `assets/`
* Don't mess with files in `www`! For example, `test/e2e.js` - compiled end to end tests will end up here (from `src/**/*.e2e.ts`); `test/unit.js` - compiled unit tests will end up here (from `src/**/*.spec.ts`)
* The strange testing convention in the E2E files is the Page [Object pattern](https://code.google.com/p/selenium/wiki/PageObjects). Basically you hide DOM-level details from tests.
* Note that since E2E code doesn't technically touch the main code base directly, there's no need to modularize it


