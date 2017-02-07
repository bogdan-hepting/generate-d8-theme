// *.libraries.yml

module.exports = function add(dir_name, br, tab) {
  var content;
    
  content = 'base:' + br;
  content += tab + 'version: 1.x' + br;
  content += tab + 'css:' + br;
  content += tab + tab + 'theme:' + br;
  content += tab + tab + tab + 'css/styles.css: {}' + br;
  content += tab + 'js:' + br;
  content += tab + tab + 'js/dist/theme.bundle.js: {}' + br;
  content += tab + 'dependencies:' + br;
  content += tab + tab + '- core/jquery' + br;

  return content;
}