Overview
========

This is a seed for an Ionic/TypeScript setup. Features of this project:

* Unlike most other seeds, this one also includes test examples files
* Everything uses source maps so failing tests and broken code will show you the .ts file that is causing it
* Ready to go for use in Ionic
* Gulp instead of Grunt (some may debate this choice)
* Examples of how to export Angular classes in TypeScript
* Uses hand-written TypeScript `.d.ts` files (in `src/definitions`) as well as `tsd` files
* Angular portion of project is using the feature pattern where files are organized by feature instead of type (this is considered a best-practice)
* The convention used for $scope variable assignment prevents primitives from being assigned (this avoids many bugs; see http://zcourts.com/2013/05/31/angularjs-if-you-dont-have-a-dot-youre-doing-it-wrong/)
* JSHint ready to go
* A comprehensive `.gitignore`
* Uses `gulp-notify` for errors


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
ionic platform add ios
gulp
```

Development
===========

To enable the gulp processes (SASS compilation):

```bash
gulp watch
```

To run tests

```bash
gulp test
```

It's assumed development is being done in a Typescript supported IDE such as Webstorm. If you intend to run it yourself,
see this: https://www.npmjs.com/package/gulp-typescript

Adding new dependencies
-----------------------

* For TSDs (to have TypeScript detection), use `tsd install <package> --save`
* For bower (things used in the browser), use `bower install <package> --save`
* For npm (things used to build stuff), use `npm install <package> --save-dev`



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
