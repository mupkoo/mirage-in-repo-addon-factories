/*jshint node:true*/
var path = require('path');
var mergeTrees = require('broccoli-merge-trees');
var Funnel = require('broccoli-funnel');

module.exports = {
  name: 'shuttle',

  included: function (app) {
    this.mirageSupportDirectory = path.join(this.root, 'mirage-support');
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
