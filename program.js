const command = require('commander');


module.exports = command
  .version('0.0.1')
  .option('-a, --all', 'Install npm watch scripts (package.json)')
  .option('-w, --watcher', 'Install npm watch scripts (package.json)')
  .option('-s --sass <git>', 'Git path to clone custom sass files')
  .parse(process.argv);
