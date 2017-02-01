const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;
const cmd = require('node-cmd');

module.exports = {

  run: function (cmd, callback, log) {
    var show_log = (log == null) ? true : log;

    exec(cmd, function(error, stdout, stderr) {
      if(show_log) {
        if (stdout) {
          console.log(stdout);
        }
        if (stderr) {
          console.log(stderr);
        }
      }
      if (error !== null) {
        console.log("exec error: " + error);
      }

      if (callback) {callback();}
    });
  },

  write: function (filename, content) {
    if (fs.existsSync(filename)) {
      return false;
    } else {
      var pathToFile = filename.split('/');

      if (pathToFile.length > 1) {
        pathToFile.pop();
        this.writeDir(pathToFile.join('/'));
      }

      fs.writeFile(filename, content, function(err) {
        if (err) {
          console.error(err);
        } else {
          console.log('- ' + filename);
        }
      });
    }
  },

  writeDir: function (dir_path) {
    var parts = dir_path.split('/');
    var mkdirSync = function (dir) {
      try {
        fs.mkdirSync(dir);
      } catch(e) {
        if ( e.code != 'EEXIST' ) throw e;
      }
    }

    if(parts.length > 1) {
      for( var i = 1; i <= parts.length; i++ ) {
        mkdirSync( path.join.apply(null, parts.slice(0, i)) );
      }
    } else {
      mkdirSync(dir_path);
    }
  }
};