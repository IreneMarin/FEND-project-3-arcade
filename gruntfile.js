module.exports = function(grunt) {
    
    grunt.initConfig({
        jsdoc : {
            dist : {
                src: ['js/app.js', 'js/engine.js', 'README.md'],
                options: {
                    destination: 'doc',
                    template : "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template",
                    configure : "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template/jsdoc.conf.json"
                }
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-jsdoc');
    
    grunt.registerTask('default', ['jsdoc']);
};