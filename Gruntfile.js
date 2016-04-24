'use strict';

module.exports = function(grunt) {

	grunt.initConfig({

		/* Compress CSS-files: */
		cssc: {
			build: {
				options: {
					consolidateViaDeclarations: true,
					consolidateViaSelectors: true,
					consolidateMediaQueries: true
				},
				files: {
					'build/css/**.css': 'build/css/clean-blog.css'
				}
			}
		},

		/* Additional CSS minification: */
		cssmin: {
			build: {
				src: 'build/css/clean-blog.css',
				dest: 'build/css/clean-blog.min.css'
			}
		},

		/* Watch and live-reload HTML, JS, CSS, and image files: */
		watch: {
			html: {
				files: ['src/app/index.html', 'src/app/about.html', 'src/app/index.html'],
				tasks: ['htmlhint', 'copy:html'],
				options: {
					livereload: true
				}
			},
			js: {
				files: ['src/app/app.js', 'src/app/scripts/components/**/*.js*',
					    'src/app/scripts/actions/**/*.js*', 'src/app/scripts/stores/**/*.js*'],
				tasks: ['browserify'],
				options: {
					livereload: true
				}
			}
		},

		/* Minify HTML-files: */
		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: {
					'build/index.html': 'build/index.html',
					'build/404.html': 'build/404.html'
				}
			}
		},

		/* Check up on HTML formatting: */
		htmlhint: {
			build: {
				options: {
					'tag-pair': true,
					'tagname-lowercase': true,
					'attr-lowercase': true,
					'attr-value-double-quotes': true,
					'doctype-first': true,
					'spec-char-escape': true,
					'id-unique': true,
					'head-script-disabled': true,
					'style-disabled': true
				},
				src: ['src/app/index.html', 'src/app/about.html', 'src/app/404.html']
			}
		},

		/* Uglify and minimize javascript: */
		uglify: {
			build: {
				files: {
					'build/pack.js': ['build/pack.js']
				}
			}
		},

		/* Handles require() and parses React JSX-files: */
		browserify: {
			options: {
				transform: [require('reactify')]
			},
			dist: {
				files: {
					'build/pack.js': ['src/app/app.js']
				}
			}
		},

		/* Copy images files from src to build: */
		copy: {
			html: {
				files: [ { src: 'src/app/index.html', dest: 'build/index.html' },
                         { src: 'src/app/about.html', dest: 'build/about.html' },
                         { src: 'src/CNAME', dest: 'build/CNAME' },
   					     { src: 'src/app/404.html', dest: 'build/404.html' }]
			},
			images: {
				files: [
					{
						expand: true,
						cwd: 'src/app/scripts/components/',
						src: ['**/*.{png,jpg,gif,svg}'],
						dest:'build/gfx/'
					}
				]
			},
            htmlimages: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/app/img/',
                        src: ['**/*.{png,jpg,gif,svg,ico,xml}'],
                        dest:'build/img/'
                    }
                ]
            },
			fonts: {
				files: [
					{
						expand: true,
						cwd: 'src/app/fonts/',
						src: ['**/*.{eot,tff,svg,woff}'],
						dest:'build/fonts/'
					}
				]
			},
			css: {
				files: [
					{
						expand: true,
						cwd: 'src/app/styles/',
						src: ['**/*.css'],
						dest:'build/css/'
					}
				]
			}
		},

		/* Clean up the build directory: */
		clean: {
			build: ["build"]
		}

	});

	/* -----------------------------------------------------------
	 Load tasks used in the Grunt processes:
	 ----------------------------------------------------------- */
	grunt.loadNpmTasks('grunt-react'); // Enables parsing of React JXS to JS
	grunt.loadNpmTasks('grunt-browserify'); // Handles things like Require()
	grunt.loadNpmTasks('grunt-cssc'); // Condense CSS-files
	grunt.loadNpmTasks('grunt-contrib-cssmin'); // Minified CSS-files
	grunt.loadNpmTasks('grunt-htmlhint'); // Hints HTML output
	grunt.loadNpmTasks('grunt-contrib-watch'); // Watches src directory for changes
	grunt.loadNpmTasks('grunt-contrib-htmlmin'); // Minifies HTML
	grunt.loadNpmTasks('grunt-autoprefixer'); // Auto-prefixes CSS elements
	grunt.loadNpmTasks('grunt-contrib-uglify'); // Uglified and minifies JS-files
	grunt.loadNpmTasks('grunt-contrib-copy'); // Copies files from src to build
	grunt.loadNpmTasks('grunt-contrib-clean'); // Clean build directory
	grunt.loadNpmTasks('grunt-contrib-imagemin'); // Optimize images

	/* -----------------------------------------------------------
	 Register Grunt tasks:
	 ----------------------------------------------------------- */
	grunt.registerTask('default', []);

	/* grunt dev */
	grunt.registerTask('dev', [
		'clean:build',
		'browserify',
		'copy:html',
		'copy:images',
		'copy:htmlimages',
        'copy:css',
        'cssmin',
        'copy:fonts',
		'watch'
	]);

	/* create raw uncompressed output */
	grunt.registerTask('raw', [
		'clean:build',
		'browserify',
		'copy:html',
		'copy:images',
		'copy:css',
        'copy:htmlimages',
        'copy:fonts'
	]);

	/* grunt tst */
	grunt.registerTask('tst', [
		'clean:build',
		'browserify',
		'uglify',
		'cssc',
		'cssmin',
		'copy:html',
		'copy:images',
        'copy:htmlimages',
		'copy:css',
		'cssmin',
		'copy:fonts',
		'htmlmin'
	]);
};
