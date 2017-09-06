var path = require('path');
var htmlPath = '/home/knubbe/www/westart/eckero/html/';

// Browser definitions for autoprefixer
var autoprefixer_options = [
'last 3 versions',
'ie >= 9',
'ios >= 7',
'android >= 4.4'
];

var paths = {
	'project': {
		'base':     '/home/knubbe/www/westart/project/html/',
		'protocol': 'http://',
		'proxy':    'project.westart.se'
		// proxy: 'sub.project.westart.se'
	},

	'script': {
		'theme': {
			'src': [
				htmlPath + 'content/themes/eckero-theme/js/*.js',
				'!' + htmlPath + 'content/themes/eckero-theme/js/select2_locale*.js'
			],
			'dest': htmlPath + 'content/themes/eckero-theme/js/min/',
			'base': htmlPath + 'content/themes/eckero-theme/js/'
		},

		'theme-vendor': {
			'src': [
				htmlPath + 'content/themes/eckero-theme/js/vendor/*.js',
			],
			'dest': htmlPath + 'content/themes/eckero-theme/js/min/vendor/',
			'base': htmlPath + 'content/themes/eckero-theme/js/vendor/'
		},

		'plugins': {

			'wa-alert-messages': {
				'src':  htmlPath + 'content/plugins/wa-alert-messages/js/alert-messages.js',
				'dest': htmlPath + 'content/plugins/wa-alert-messages/js/min/',
				'base': htmlPath + 'content/plugins/wa-alert-messages/js/',
			},

			'wa-cares-booking': {
				'src': {
					'root': [
						htmlPath + 'content/plugins/wa-cares-booking/js/*.js',
					],
					'components': [
						htmlPath + 'content/plugins/wa-cares-booking/js/components/area-map.js',
						htmlPath + 'content/plugins/wa-cares-booking/js/components/premise-room-selection.js',
						htmlPath + 'content/plugins/wa-cares-booking/js/components/rating.js',
						htmlPath + 'content/plugins/wa-cares-booking/js/components/wa-vue-clndr.js'
					]
				},
				'dest': {
					'root':       htmlPath + 'content/plugins/wa-cares-booking/js/min/',
					'components': htmlPath + 'content/plugins/wa-cares-booking/js/min/'
				},
				'base': htmlPath + 'content/plugins/wa-cares-booking/js/',
			},

			'wa-cookie-notice': {
				'src': htmlPath + 'content/plugins/wa-cookie-notice/js/*.js',
				'dest': htmlPath + 'content/plugins/wa-cookie-notice/js/min/',
				'base': htmlPath + 'content/plugins/wa-cookie-notice/js/',
			},
			'wa-tables-module': {
				'src': htmlPath + 'content/plugins/wa-tables-module/js/*.js',
				'dest': htmlPath + 'content/plugins/wa-tables-module/js/min/',
				'base': htmlPath + 'content/plugins/wa-tables-module/js/',
			},
		}
	},

	'style': {
		src:  [
			htmlPath + 'content/themes/eckero-theme/scss/**/*.scss'
		],
		// dest: '/htmlPath + 'content/themes/eckero-theme/',
		// base: '/htmlPath + 'content/themes/eckero-theme/scss'
		folders: [
			htmlPath + 'content/themes/eckero-theme/'
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
