'use strict';

const SHARD_COUNT = exports.SHARD_COUNT || 2;

const _ = require('lodash');
const glob = require('glob');
const fs = require('fs');

const cucumberOpts = {
  format: ['pretty', 'json:results.json'],
  require: 'features/step_definitions/**/*.js',
  'no-source': true
};

function getShardedFeatures(allFeatures) {
  const featuresPerShard = Math.floor(allFeatures.length / SHARD_COUNT);

  return _.reduce(allFeatures, function (memo, feature) {
    let lastShard = _.last(memo);

    if (lastShard.length >= featuresPerShard) {
      lastShard = [];
      memo.push(lastShard);
    }

    lastShard.push(feature);
    return memo;
  }, [[]]);
}

function getMultiCapabilities () {
  const shards = getShardedFeatures(glob.sync('features/**/*.feature'));

  return _.map(shards, function (files, i) {
    const shardNumber = ++i;

    return {
      browserName: 'chrome',
      specs: files,
      cucumberOpts: _.tap(_.clone(cucumberOpts), function (options) {
        options.format = _.map(options.format, function (format) {
          return format.replace(/\.json/, `-${shardNumber}.json`);
        });
      })
    };
  });
}

exports.config = {
  framework: 'custom',
  frameworkPath: 'node_modules/protractor-cucumber-framework',
  cucumberOpts,
  getMultiCapabilities
};
