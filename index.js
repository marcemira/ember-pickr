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
    this.options.autoImport.alias.pickr = '@simonwep/pickr/dist/pickr.es5.min';
  },
};
