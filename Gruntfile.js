/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        globals: {
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js']
      }
    },
    nodeunit: {
      files: ['test/**/*_test.js']
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'nodeunit']
      }
    },
    clean: {
      oggTest: 'tmp'
    },
    responsive_videos: {
      oggTest: {
        options: {
          sizes: [{
            width: 320,
            poster: true
          }],
          encodes:[{
            webm: [
              {'-vcodec': 'libvpx'},
              {'-acodec': 'libvorbis'},
              {'-crf': '12'},
              {'-b:v': '1.5M'},
              {'-q:a': '100'}
            ],
            ogv: [
              {'-vcodec': 'libtheora'}, 
              {'-acodec': 'libvorbis'}, 
              {'-threads': '0'}
            ]
          }]
        },
        files: [{
          expand: true,
          src: ['video/**.{mov,mp4}'],
          cwd: 'assets/',
          dest: 'tmp/'
        }]
      }
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-responsive-videos');

  // Default task.
  grunt.registerTask('default', ['jshint', 'nodeunit']);

  grunt.registerTask('oggtest', 'Test ogv', [
    'clean:oggTest',
    'responsive_videos:oggTest'
  ]);

};
