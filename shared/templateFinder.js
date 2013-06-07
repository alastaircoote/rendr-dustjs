/*global rendr*/
var templates = null;

module.exports = function(Dust) {
  

  return {
    getTemplate: function(templateName) {
      /**
       * Allow compiledTemplates to be created asynchronously.
       */
       if (!templates) {
        templates = require(rendr.entryPath + '/app/templates/compiledTemplates');
        templates(Dust);
       }

      return function(data) {
        html = ""
        Dust.render(templateName,data,function(err,out) {
            html = out;
        })
        return html;
      }
    }
  }
};
