# generate-d8-theme

Node.js command-line tool for generating theme for Drupal 8.


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
- sass/ _**(basic files will be pulled from git repository)**_
- images/ _**(empty folder)**_
