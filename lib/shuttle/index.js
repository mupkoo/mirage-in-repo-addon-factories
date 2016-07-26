/*jshint node:true*/
var path = require('path');
var mergeTrees = require('broccoli-merge-trees');
var Funnel = require('broccoli-funnel');

module.exports = {
  name: 'shuttle',

  included: function (app) {
    this.app = app;
    this.addonConfig = this.app.project.config(app.env)['ember-cli-mirage'] || {};
    this.mirageSupportDirectory = path.join(this.root, 'mirage-support');
  },

  treeForApp: function(appTree) {
    var trees = [appTree];

    if (this._shouldIncludeMirageFiles()) {
      trees.push(new Funnel(this.mirageSupportDirectory, {
        destDir: 'mirage'
      }));
    }

    return mergeTrees(trees);
  },

  isDevelopingAddon: function() {
    return true;
  },

  _shouldIncludeMirageFiles: function() {
    if (process.env.EMBER_CLI_FASTBOOT) { return false; }

    var enabledInProd = this.app.env === 'production' && this.addonConfig.enabled;
    var explicitExcludeFiles = this.addonConfig.excludeFilesFromBuild;

    if (enabledInProd && explicitExcludeFiles) {
      throw new Error('Mirage was explicitly enabled in production, but its files were excluded ' +
                      'from the build. Please, use only ENV[\'ember-cli-mirage\'].enabled in ' +
                      'production environment.');
    }

    return enabledInProd || (this.app.env !== 'production' && explicitExcludeFiles !== true);
  }
};
