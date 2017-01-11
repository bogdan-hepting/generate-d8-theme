// *.info.yml

module.exports = function add(dir_name, br, tab) {
	var content;

	var theme_name = dir_name.replace(/[^a-z0-9]/gi, ' ');
	theme_name = theme_name.charAt(0).toUpperCase() + theme_name.slice(1);
    
    content = 'name: ' + theme_name + br;
	content += 'type: theme' + br;
	content += 'description: "A subtheme of Classy, built for ' + theme_name + '."' + br;
	content += 'core: 8.x' + br;
	content += 'base theme: classy' + br;
	content += br;
	content += 'libraries:' + br;
	content += tab + '- ' + dir_name + '/base' + br;
	content += br;
	content += 'regions:' + br;
	content += tab + 'header: "Header"' + br;
	content += tab + 'navigation: "Navigation"' + br;
	content += tab + 'highlighted: "Highlighted"' + br;
	content += tab + 'content: "Content"' + br;
	content += tab + 'footer: "Footer"' + br;

	return content;
}