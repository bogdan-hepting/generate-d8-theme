# generate-d8-theme

Node.js command-line tool for generating theme for Drupal 8.

## Installation
All you need is run
```
npm install generate-d8-theme
```


## Setup
Ensure you're in the Drupal project in `theme/your-theme-folder` and run command
```
generate-theme
```
Module will generate basic Drupal 8 theme files for you.

If you want to setup additionally watcher for css and js use command 
```
generate-theme -a
```
**Note:** theme folder must be empty

more details about watcher [here](https://github.com/varjatua/npm-watcher)

### Files will be created:

- your-theme-folder.info.yml
- your-theme-folder.libraries.yml
- your-theme-folder.theme
- templates/page/page.html.twig
- js/src/your-theme-folder.js
- sass/ _**(basic files will be pulled from git repository)**_
- images/ _**(empty folder)**_
