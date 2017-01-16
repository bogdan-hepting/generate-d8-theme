#!/usr/bin/env node
const dir_name = (process.cwd().split('\\').slice(-1)[0]).replace(/[^a-z0-9_\-.]/gi, '_').toLowerCase();
const writeFile = require('write');
const fs = require('fs');
const clone = require('git-clone');
const program = require('commander');
const exec = require('child_process').exec;

var cmd=require('node-cmd');

program
  .version('0.0.1')
  .option('-a, --all', 'Install npm watch scripts (package.json)')
  .parse(process.argv);


function run (cmd, callback) {
  exec(cmd, function(error, stdout, stderr) {
    if (stdout) {
      console.log(stdout);
    }
    if (stderr) {
      console.log(stderr);
    }
    if (error !== null) {
      console.log("exec error: " + error);
    }

    if (callback) {callback();}
  });
}

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

function writeThemeSass(callback) {
  var git = 'git@github.com:varjatua/scss-base.git',
      location = './sass/',
      msg = "\nInstalled base scss files\n";

  run('git clone ' + git + ' ' + location, function() {
    console.log(msg);
    run('rm -rf ' + location + '.git');
    if (callback) {callback();}
  });
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

function writeWatcherFiles() {
  var git = 'git@github.com:varjatua/npm-watcher.git',
      location = '.';

  console.log('\nInstalling watcher');
  run('rm -rf * .*', function() {
    run('git clone ' + git + ' ' + location, function() {
      run('rm -rf .git');

      console.log("\nCreating theme files.\n");
      writeThemeFiles();
      writeTemplates();
      writeThemeJs();
      writeThemeDirectories();

      writeThemeSass(function() {
        console.log('\nInstalling node modules');
        run('npm install && npm prune', function() {
          console.log('\nDone\nNow run command \"npm run watch\"');
          run('npm run build:all');
        });
      });
    });
  })

  

}


if (program.all) {
  writeWatcherFiles();
} else {
  console.log("\nCreating theme files.\n");
  writeThemeFiles();
  writeTemplates();
  writeThemeJs();
  writeThemeDirectories();
  writeThemeSass();
}