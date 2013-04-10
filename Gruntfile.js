/*global module:false */
module.exports = function(grunt) {

	var fontFiles = [
		"FontAwesome.otf",
		"fontawesome-webfont.eot",
		"fontawesome-webfont.svg",
		"fontawesome-webfont.ttf",
		"fontawesome-webfont.woff"
	];

	grunt.initConfig({
		clean: {
			build: ["assets/"],
			repo: ['js/lib', "font"]
		},
		compass: {
			dist: {
				options: {
					config: 'config.rb'
				}
			}
		},
		copy: {
			font: {
				expand: true,
				flatten: true,
				src: ["font/*.*"],
				dest: "assets/",
				filter: "isFile"
			},
			js: {
				expand: true, flatten: true,
				src: ["js/**"],
				dest: "assets/",
				filter: "isFile"
			},
			imgs: {
				expand: true, flatten: true,
				src: ["imgs/**"],
				dest: "assets/",
				filter: "isFile"
			}
		},
		curl: {
			'js/lib/_ts.js': 'https://raw.github.com/colmjude/_ts.js/master/_ts.js',
			'js/lib/handlebars.js': 'https://raw.github.com/wycats/handlebars.js/master/dist/handlebars.js',
			'js/lib/moment.min.js': 'https://raw.github.com/timrwood/moment/develop/min/moment.min.js',
			'js/lib/html5shiv.js': 'https://raw.github.com/aFarkas/html5shiv/master/dist/html5shiv.js'
		},
		"curl-dir": {
			"font": [
				"https://raw.github.com/FortAwesome/Font-Awesome/master/font/{" + fontFiles + "}"
			]
		},
		exec: {
			tsserve: {
				command: "tsapp serve",
				stdout: true
			},
			tspush: {
				command: "tsapp push blog_public",
				stdout: true
			}
		},
		jshint: {
			files: {
				src: ["Gruntfile.js", "js/*.js"]
			}
		}
	});

	grunt.registerTask("ts-deploy", "Deploy the application to TiddlySpace", function() {

		grunt.task.run("exec:tspush");
	});

	grunt.registerTask("ts-serve", "Host the application locally via tsapp", function() {

		grunt.task.run("exec:tsserve");
	});

	grunt.registerTask("default", ["jshint", "curl", "curl-dir", "copy", "compass"]);
	grunt.registerTask("tsapp-clean", ["clean:build"]);
	grunt.registerTask("update-dev", ["compass", "copy", "ts-serve"]);
	grunt.registerTask("deploy", ["compass", "copy", "ts-deploy"]);

	grunt.loadNpmTasks("grunt-exec");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-compass");
	grunt.loadNpmTasks("grunt-curl");
	grunt.loadNpmTasks("grunt-contrib-clean");
};
