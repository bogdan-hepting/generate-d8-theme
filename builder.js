const fs = require('fs');
const helper = require("./helpers.js");

module.exports = {
  _fileData: function (dir, file_type) {
    var content = require('./' + dir + '/' + file_type + '.js'),
        tab = '  ', br = '\n';
    return content(this.project_name, br, tab);
  },

  themeDirectories: function () {
    helper.writeDir('images');
  },

  themeFiles: function () {
    var fileTypes = ['info.yml', 'libraries.yml', 'theme'],
        fileTypesLength = fileTypes.length,
        filesDirectory = 'theme-files';

    for ( var i = 0; i < fileTypesLength; i++) {
      var filename = this.project_name + '.' + fileTypes[i],
        content = this._fileData(filesDirectory, fileTypes[i]);
      helper.write (filename, content);
    }
  },

  templates: function () {
    var fileTypes = ['page/page.html.twig'],
        fileTypesLength = fileTypes.length,
        filesDirectory = 'theme-templates';

    for ( var i = 0; i < fileTypesLength; i++) {
      var filename = fileTypes[i],
          content = this._fileData(filesDirectory, fileTypes[i]);
      helper.write ('templates/' + filename, content);
    }
  },

  themeJs: function () {
    helper.write('js/src/' + this.project_name + '.js', '// ' + this.project_name + '.js' + '\n\n');
  },

  themeSass: function (callback) {
    var git = 'git@github.com:bogdan-hepting/scss-base.git',
        location = './sass';

    if (fs.existsSync(location)) {
      if (callback) {callback();}
      return;
    } else {
      helper.run('git clone ' + git + ' ' + location, function() {
        console.log('\nInstalled base scss files\n');
        helper.run('rm -rf ' + location + '.git');
        if (callback) {callback();}
      }, false);
    }
  },

  watcherFiles: function (callback) {
    var _t = this,
        git = 'git@github.com:bogdan-hepting/npm-watcher.git';

    console.log('Cloning watcher files');

    // callback hell @todo: resolve... somehow
    helper.run('rm -fr .git', function gitInit () {

      helper.run('git init', function gitAddOrigin () {

        helper.run('git remote add origin ' + git, function gitFetch () {

          helper.run('git fetch', function gitReset () {

            helper.run('git reset --hard origin/master', function removeGit () {
              console.log('done');
              helper.run('rm -fr .git');
              _t.npmInstall(_t.watcherInfo);
            }, false);
          }, false);
        }, false);
      }, false);
    })
  },

  npmInstall: function (callback) {
    console.log('\nInstalling node modules');
    helper.run('npm install', function () {
      helper.run('npm prune', function () {
        console.log('done');
        if (callback) {callback();}
      }, false);
    }, false);
  },

  watcherInfo: function () {
    console.log('\nNext steps:\n');
    console.log('\'npm run watch:css\' - to run watcher (css only)');
    console.log('\'npm run watch:js\' - to run watcher (js only)');
    console.log('\'npm run watch\' - to run watcher (css/js)');
    console.log('\n for more detail see \'README.md\'');
  }

};
