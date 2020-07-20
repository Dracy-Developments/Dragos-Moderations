/**
 * `tasks/register/cluster.js`
 *
 * ---------------------------------------------------------------
 *
 * This Grunt tasklist will be executed instead of `default` when
 * your Sails app is lifted in a cluster environment (e.g. using
 * `grunt cluster`).
 *
 *
 */
module.exports = function(grunt) {
    grunt.registerTask('cluster', [
      'polyfill:prod', //« Remove this to skip transpilation in production (not recommended)
      'compileAssets',
      'babel',         //« Remove this to skip transpilation in production (not recommended)
      'concat',
      'uglify',
      'cssmin',
      'sails-linker:prodJs',
      'sails-linker:prodStyles',
    ]);
  };
  