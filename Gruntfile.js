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

	grunt.registerTask("default", ["jshint", "copy"]);
	grunt.registerTask("update-dev", ["compass", "ts-serve"]);

	grunt.loadNpmTasks("grunt-exec");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-compass");
};
