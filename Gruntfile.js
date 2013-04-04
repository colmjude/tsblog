/*global module:false */
module.exports = function(grunt) {

	// var fontFiles = [
	//     "IcoMoon.eot",
	//     "IcoMoon.svg",
	//     "IcoMoon.ttf",
	//     "IcoMoon.woff"
	// ];
	grunt.initConfig({
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
			}
		},
		curl: {
			'assets/_ts.js': 'https://raw.github.com/colmjude/_ts.js/master/_ts.js',
			'assets/handlebars.js': 'https://raw.github.com/wycats/handlebars.js/master/dist/handlebars.js',
			'assets/moment.min.js': 'https://raw.github.com/timrwood/moment/develop/min/moment.min.js'
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
				src: ["Gruntfile.js", "assets/tsblog.js"]
			}
		}
	});

	grunt.registerTask("ts-deploy", "Deploy the application to TiddlySpace", function() {

		grunt.task.run("exec:tspush");
	});

	grunt.registerTask("ts-serve", "Host the application locally via tsapp", function() {

		grunt.task.run("exec:tsserve");
	});

	grunt.registerTask("default", ["jshint", "copy", "curl"]);
	grunt.registerTask("update-dev", ["compass", "ts-serve"]);

	grunt.loadNpmTasks("grunt-exec");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-compass");
	grunt.loadNpmTasks("grunt-curl");
};
