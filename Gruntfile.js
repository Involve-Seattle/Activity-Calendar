'use strict';

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-browserify');
  // grunt.loadNpmTasks('grunt-wiredep');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    project: {
      app: ['app'],
      scss: ['<%= project.app %>/sass/style.scss'],
      css: ['<%= project.app %>/css/**/*.css'],
      alljs: ['<%= project.app %>/js/**/*.js']
    },

    // wiredep: {
    //   task: {
    //     src: [
    //         '<%= project.app %>/*.html',
    //         '<%= project.app %>/sass/style.scss'
    //     ]
    //   }
    // },

    clean: {
      dev: {
        src: ['build/']
      }
    },

    copy: {
      dev: {
        expand: true,
        cwd: 'app/',
        src: ['*.html', '<%= project.css %>','<%= project.app %>/css/*.css.map'],
        dest: 'build/',
        filter: 'isFile'
      }
    },

    jshint: {
      all: ['<%= project.alljs %>','Gruntfile.js','server.js'],
      options: {
        jshintrc: true
      }
    },

    jscs: {
      src: ['<%= project.alljs %>','server.js','Gruntfile.js'],
      options: {
        config: '.jscsrc',
      }
    },

    browserify: {
      dev: {
        options: {
          transform: ['debowerify'],
          debug: true
        },
        src: ['<%= project.alljs %>'],
        dest: 'build/js/app.js'
      },
      frontEndTest: {
        options: {
          transform: ['debowerify'],
          debug: true
        },
        src: ['test/front-end/**/*test.js'],
        dest: 'test/testbundle.js'
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js'
      },
      continuous: {
        configFile: 'karma.conf.js',
        singleRun: true,
        browsers: [ 'PhantomJS' ]
      },
    },

    sass: {
      dev: {
        options: {
          style: 'expanded',
          compass: false
        },
        files: {
          'build/css/style.css':'<%= project.scss %>'
        }
      }
    },

    express: {
      options: {
         // Override defaults here
         output: 'listening'
      },
      dev: {
        options: {
          script: 'server.js'
        }
      },
      prod: {
         options: {
           script: 'server.js',
           node_env: 'production'
        }
      },
      test: {
        options: {
          script: 'server.js',
          node_env: 'test'
        }
      }
    },

    watch: {
      sass: {
        files: '<%= project.app %>/sass/{,*/}*.{scss,sass}',
        tasks: ['build']
      },
      express: {
        files:  [ 'server.js','app/index.html' ],
        tasks:  [ 'build', 'express:dev' ],
        options: {
          spawn: false
        }
      },
      app: {
        files: [ '<%= project.alljs %>' ],
        tasks: [ 'browserify:dev' ]
      },
      test: {
        files: [ '<%= project.alljs %>', 'test/front-end/**/*.js'],
        tasks: [ 'build:dev', 'browserify:frontEndTest', 'karma:unit']
      }
    }
  }); //end initConfig

  grunt.registerTask('build', ['clean:dev', 'sass:dev', 'browserify:dev', 'copy:dev']);
  grunt.registerTask('test', ['build:dev', 'browserify:frontEndTest','karma:unit']);
  grunt.registerTask('default', ['test','watch']);
  grunt.registerTask('serve', [ 'build:dev', 'express:dev', 'watch' ]);

};
