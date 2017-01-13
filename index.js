#!/usr/bin/env node
const dir_name = (process.cwd().split('\\').slice(-1)[0]).replace(/[^a-z0-9_\-.]/gi, '_').toLowerCase();
const writeFile = require('write');
const fs = require('fs');
const clone = require('git-clone');

function _write (filename, content) {
	if (!fs.existsSync(filename)) {
    	writeFile(filename, content, function(err) {
      		if (err) {
        		console.log(err);
      		} else {
				console.log('- ' + filename);
      		}
		});
	}
}

function _filesData(dir, file_type) {
  var content = require('./' + dir + '/' + file_type + '.js'),
      tab = '  ', br = '\n';
  return content(dir_name, br, tab);
}

function writeThemeDirectories() {
  _write('images/.gitkeep', '');
}

function writeThemeJs() {
	_write('js/src/' + dir_name + '.js', '// ' + dir_name + '.js' + '\n\n');
}

function writeThemeSass() {
	// @todo: create repository with sass base files structure instead.
	//_write('sass/style.scss', '// sass/style.scss' + '\n\n');

  clone('git@codebasehq.com:lemberg/drupal-standard/drupal-installation-profile.git', './sass/');
}

function writeThemeFiles() {
  var fileTypes = ['info.yml', 'libraries.yml', 'theme'],
      fileTypesLength = fileTypes.length,
      filesDirectory = 'theme-files';

  for ( var i = 0; i < fileTypesLength; i++) {
    var filename = dir_name + '.' + fileTypes[i],
	    content = _filesData(filesDirectory, fileTypes[i]);
    _write (filename, content);
  }
}

function writeTemplates() {
  var fileTypes = ['page/page.html.twig'],
      fileTypesLength = fileTypes.length,
      filesDirectory = 'theme-templates';

  for ( var i = 0; i < fileTypesLength; i++) {
    var filename = fileTypes[i],
        content = _filesData(filesDirectory, fileTypes[i]);
    _write ('templates/' + filename, content);
  }
}

console.log("\nCreating theme files.\n");
writeThemeFiles();
writeTemplates();
writeThemeJs();
//writeThemeSass();
writeThemeDirectories();
