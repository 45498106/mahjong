/* global module */
module.exports = function(grunt) {
    var port = grunt.option('port') || 3000;
    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner:
                '/*!\n' +
                ' * mahjong.js <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd, HH:MM") %>)\n' +
                ' * http://gleitzman.com/apps/mahjong/game\n' +
                ' * MIT licensed\n' +
                ' *\n' +
                ' * Copyright (C) 2013 Benjamin Gleitzman, http://gleitzman.com\n' +
                ' */'
        },

        uglify: {
            options: {
                banner: '<%= meta.banner %>\n'
            },
            build: {
                src: ['public/js/global/**/*.js',
                      'shared/**/*.js',
                      'public/js/src/**/*.js'],
                dest: 'public/js/dist/all.min.js'
            }
        },

        cssmin: {
            compress: {
                files: {
                    'public/css/dist/all.min.css': [ 'public/css/src/**/*.css' ]
                }
            }
        },

        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/**/*.js']
            }
        },

        concurrent: {
            compress: ['cssmin', 'uglify', 'mochaTest'],
            start: {
                tasks: ['nodemon', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },

        nodemon: {
            dev: {}
        },

        watch: {
            files: ['app.js',
                    'public/**/*.*',
                    'shared/**/*.*',
                    'server/**/*.*',
                    '!**/dist/**'], // ignore dist folder
            tasks: ['concurrent:compress']
        }

    });

    // Dependencies
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');

    // Run tests
    grunt.registerTask('test', [ 'mochaTest' ] );

    // Default tasks
    grunt.registerTask('default', ['concurrent:start']);
};
