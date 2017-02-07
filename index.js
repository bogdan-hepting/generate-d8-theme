#!/usr/bin/env node
const project_name = (process.cwd().split('\\').slice(-1)[0]).replace(/[^a-z0-9_\-.]/gi, '_').toLowerCase();
const program = require('./program.js');
const helper = require("./helpers.js");
const build = require("./builder.js");

build.project_name = project_name;



console.log("\nCreating theme files.\n");

build.themeDirectories();
build.themeFiles();
build.templates();
build.themeJsCss();

if (!(program.all || program.watcher)) {
  if (program.sass) {
    build.themeSass(function(){
      console.log('\n\nDone!\n');
    });
  }
  return;
} else {
  build.themeSass(function(){
    build.watcherFiles();
  });
}