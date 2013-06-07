var Dust = require('dustjs-linkedin');

/**
 * Export the `Handlebars` object, so other modules can add helpers, partials, etc.
 */
exports.Dust = Dust;

/**
 * `getTemplate` is available on both client and server.
 */
exports.getTemplate = require('./shared/templateFinder')(Dust).getTemplate;

/**
 * `getLayout` should only be used on the server.
 */
if (typeof window === 'undefined') {
  exports.getLayout = require('./server/layoutFinder')(Dust).getLayout;
} else {
  exports.getLayout = function() {
    throw new Error('getLayout is only available on the server.');
  };
}

exports.renderTemplate = function(name, data, cb) {
    return Dust.render(name,data,cb);
}

/**
 * Register helpers, available on both client and server.
 */
var dustHelpers = require('./shared/helpers')(Dust, exports.getTemplate);

for (var key in dustHelpers) {
  if (!dustHelpers.hasOwnProperty(key)) continue;
  //Handlebars.registerHelper(key, handlebarsHelpers[key]);
  Dust.helpers[key] = dustHelpers[key];
}

