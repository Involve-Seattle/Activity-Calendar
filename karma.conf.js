'use strict';

module.exports = function(config) {
  config.set({
    basePath: '',

    frameworks: ['jasmine'],

    files: [
      'test/front-end/*-test.js'
    ],

    exclude: [
      '**/*.swp'
    ],

    preprocessors: {
      'test/front-end/*-test.js': [ 'browserify' ]
    },

    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: false,

    browsers: ['PhantomJS'],

    singleRun: true
  });
};
