/*global rendr*/
var fs = require('fs');

module.exports = function(Dust) {
  return {
    getLayout: function(name, callback) {
      
      return callback(null, function(va) {
        html = ""
        Dust.render(name,va, function(err,h) {
          html = h
        });
        return html;
      })


      var layoutPath = rendr.entryPath + '/app/templates/' + name + '.hbs';
      fs.readFile(layoutPath, 'utf8', function (err, str) {
        if (err) return callback(err);
        var template = Dust.compile(str, name);
        callback(null, name);
      });
    }
  }
};
