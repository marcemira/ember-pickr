'use strict';

const caniuse = require('caniuse-api');
const defaultOptions = { themes: ['classic'] };

function buildOptions(app) {
  const customOptions = app.options['ember-pickr'] || {};

  return Object.assign({}, defaultOptions, customOptions);
}

module.exports = {
  name: require('./package').name,

  options: {
    autoImport: {
      alias: {},
    },
  },

  choosePickrForTargets(targets = {}) {
    const { browsers = [] } = targets;
    const browserQuery = browsers.join(',');
    if (caniuse.isSupported('es6-module', browserQuery)) {
      return '@simonwep/pickr/dist/pickr.min.js';
    }

    return '@simonwep/pickr/dist/pickr.es5.min.js';
  },

  included: function () {
    this._super.included.apply(this, arguments);

    const findHost = this._findHost;
    const app = findHost.call(this);
    const options = buildOptions(app);

    this.app = app;

    options.themes.forEach((theme) =>
      app.import(`node_modules/@simonwep/pickr/dist/themes/${theme}.min.css`)
    );

    const targets = this.project.targets;
    this.options.autoImport.alias.pickr = this.choosePickrForTargets(targets);
  },
};
