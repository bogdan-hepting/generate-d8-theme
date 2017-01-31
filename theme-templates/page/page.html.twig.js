// page.html.twig.js

module.exports = function add(dir_name, br, tab) {
  var content;
    
  content = br;
  content += '<header class="layout-header" role="banner">' + br;
  content += tab + '{{ page.header }}' + br;
  content += tab + '{{ page.navigation }}' + br;
  content += '</header>' + br;
  content += br;
  content += '{{ page.highlighted }}' + br;
  content += br;
  content += '<main id="main-content" role="main">' + br;
  content += tab + '{{ page.content }}' + br;
  content += '</main>' + br;
  content += br;
  content += '{% if page.footer %}' + br;
  content += tab + '<footer class="layout-footer" role="contentinfo">' + br;
  content += tab + tab + '{{ page.footer }}' + br;
  content += tab + '</footer>' + br;
  content += '{% endif %}' + br;

  return content;
}

