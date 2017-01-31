#!/usr/bin/env node
const project_name = (process.cwd().split('\\').slice(-1)[0]).replace(/[^a-z0-9_\-.]/gi, '_').toLowerCase();
const program = require('commander');
const helper = require("./helpers.js");
const build = require("./builder.js");

build.project_name = project_name;

program
  .version('0.0.1')
  .option('-a, --all', 'Install npm watch scripts (package.json)')
  .parse(process.argv);


console.log("\nCreating theme files.\n");

build.themeDirectories();
build.themeFiles();
build.templates();
build.themeJs();
build.themeSass(function(){
  if (!program.all) {
    console.log('\n\nDone!\n');
    return;
  } else {
    build.watcherFiles();
  }
});