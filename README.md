# generate-d8-theme

Node.js command-line tool for generating theme for Drupal 8.

## Installation
All you need is run
```
npm install -g generate-d8-theme
```


## Setup
Ensure you're in the Drupal project in `theme/your-theme-folder` and run command
```
generate-theme
```
Module will generate basic Drupal 8 theme files for you.

### Files will be created:
- your-theme-folder.info.yml
- your-theme-folder.libraries.yml
- your-theme-folder.theme
- templates/page/page.html.twig
- js/src/your-theme-folder.js
- css/styles.css
- images/ _**(empty folder)**_

**Note:** `sass` directory will be added if you add option (`--sass`, `--watcher` or `--all`) to command `generate-theme`.

##Options

###Watcher
If you want to setup additionally watcher for css and js use command 
```
generate-theme -a(--all)
```
or
```
generate-theme -w(--watcher)
```
you will additionally get `package.json` with npm scripts
more details about watcher [here](https://github.com/bogdan-hepting/npm-watcher#themekit)

###Scss
If you want get scss files from another git repository use
```
generate-theme -s(--sass) path/to/git/repository
```
default repository - https://github.com/bogdan-hepting/scss-base

