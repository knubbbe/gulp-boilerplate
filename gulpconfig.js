var path = require('path');

// Browser definitions for autoprefixer
var autoprefixer_options = [
'last 3 versions',
'ie >= 9',
'ios >= 7',
'android >= 4.4'
];

var paths = {
	project: {
		base:     '/home/knubbe/www/westart/project/html/',
		protocol: 'http://',
		proxy:    'project.westart.se'
		// proxy: 'sub.project.westart.se'
	},
	script: {
		src: [
		'/home/knubbe/www/westart/project/html/content/themes/theme/js/scripts.js',
		'/home/knubbe/www/westart/project/html/content/themes/theme/js/clndr.js',
		'/home/knubbe/www/westart/project/html/content/themes/theme/js/jquery.fancybox.js',
		'/home/knubbe/www/westart/project/html/content/themes/theme/js/js.cookie.js',
		'/home/knubbe/www/westart/project/html/content/themes/theme/js/sticky-header.js',
		'/home/knubbe/www/westart/project/html/content/themes/theme/js/wNumb.js',
		'!/home/knubbe/www/westart/project/html/content/themes/theme/js/**/*.min.js'
		],
		dest: '/home/knubbe/www/westart/project/html/content/themes/theme/js/min',
		base: '/home/knubbe/www/westart/project/html/content/themes/theme/js/'
	},
	style: {
		src:  [
			'/home/knubbe/www/westart/project/html/content/themes/theme/scss/**/*.scss',
			'!/home/knubbe/www/westart/project/html/content/themes/theme/scss/font-awesome/font-awesome.scss'
		],
		// dest: '/home/knubbe/www/westart/project/html/content/themes/theme/',
		// base: '/home/knubbe/www/westart/project/html/content/themes/theme/scss'
		folders: [
			'/home/knubbe/www/westart/project/html/content/themes/theme/'
		]
	}
};

var options = {
	script: {},
	style: {
		outputStyle: 'compressed' //  nested, expanded, compact, compressed
	},
	eslint: {
		quiet: true,
		configFile: '/home/knubbe/.eslintrc'
	}
};

var notifications = {
	script: {
		// message: "Minified: <%= file.relative %>"
		error: {
			title: 'JS Error:',
			message: '<%= error.message %>',
			icon: path.join(__dirname, 'icons/nodejs.png')
		}
	},
	style: {
		message: "Compile: <%= file.relative %>",
		error: {
			title: 'SCSS Error:',
			message: '<%= error.message %>',
			icon: path.join(__dirname, 'icons/sass.png')
		}
	}
};

module.exports = {
	autoprefixer_options: autoprefixer_options,
	paths:                paths,
	options:              options,
	notifications:        notifications
};
