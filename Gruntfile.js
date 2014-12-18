'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');

  grunt.initConfig({
    jshint: {
      all: ['models/**/*.js', 'server.js', 'routes/**/*.js', 'app/**/*.js'],
      options: {
        jshintrc: true,
        ignores: ['public/jquery-1.11.1.js']
      }
    },

    jscs: {
      src: ['models/**/*.js', 'server.js', 'routes/**/*.js', 'app/**/*.js'],
      options: {
        config: '.jscsrc'
      }
    },

    simplemocha: {
      src: ['test/back_end/*.js']
    },

    clean: {
      dev: {
        src: ['build/']
      }
    },

    copy: {
      dev: {
        cwd: 'app/',
        src: ['**/*.html', '**/*.css', 'images/**/*'],
        expand: true,
        dest: 'build/'
      }
    },

    browserify: {
      dev: {
        src: ['app/js/**/*.js'],
        dest: 'build/bundle.js',
        options: {
          transform: ['debowerify']
        }
      },

      test: {
        src: ['test/front_end/*.js'],
        dest: 'test/testbundle.js',
        options: {
          transform: ['debowerify']
        }
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js'
      },
      continuous: {
        configFile: 'karma.conf.js',
        singleRun: true,
        browsers: ['PhantomJS']
      }
    },
    sass: {
      dist: {
        files: {
          'app/sass/styles.css': 'app/sass/styles.scss'
        }
      }
    },
    watch: {
      source: {
        files: ['app/sass/**/*.scss', 'app/sass/**/*.sass'],
        tasks: ['sass'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.registerTask('build:dev', ['clean:dev', 'browserify:dev', 'copy:dev']);
  grunt.registerTask('test:client', ['browserify:test', 'karma:unit']);
  grunt.registerTask('test', ['jshint', 'jscs', 'simplemocha', 'test:client']);
  grunt.registerTask('styles', ['sass']);
  grunt.registerTask('default', ['test', 'sass', 'build:dev']);
};
