/*jshint node:true*/
var path = require('path');
var mergeTrees = require('broccoli-merge-trees');
var Funnel = require('broccoli-funnel');

module.exports = {
  name: 'shuttle',

  included: function (app) {
    this.mirageSupportDirectory = path.resolve(app.project.root, path.join('lib', 'shuttle', 'mirage-support'));
  },

  treeForApp: function() {
    return new Funnel(this.mirageSupportDirectory, {
      destDir: 'mirage'
    });
  },

  isDevelopingAddon: function() {
    return true;
  }
};
