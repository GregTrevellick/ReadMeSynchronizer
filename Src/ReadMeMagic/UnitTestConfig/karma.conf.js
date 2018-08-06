module.exports = function (config) {
    config.set({
        basePath: '.',
        frameworks: ['jasmine'],
        // ... normal karma configuration
        files: [
            // all files ending in "_test"
            //{ pattern: 'test2/*_test.js', watched: false },
            //{ pattern: 'test/**/*_test.js', watched: false }
            'test/index_test.js',
            // each file acts as entry point for the webpack configuration
            //'../App/UpdateReadmeFiles/update_readme_files.spec.ts'
        ],

        preprocessors: {
            // add webpack as preprocessor
            //'test/*_test.js': ['webpack', 'sourcemap'],
            //'test/**/*_test.js': ['webpack', 'sourcemap'],
            'test/index_test.js': ['webpack', 'sourcemap'],
            //'../App/UpdateReadmeFiles/update_readme_files.spec.ts': ['webpack', 'sourcemap']
        },
        webpack: {
            // karma watches the test entry points
            // (you don't need to specify the entry option)
            // webpack watches dependencies

            // webpack configuration
        },

        webpackMiddleware: {
            // webpack-dev-middleware configuration
            // i. e.
            stats: 'errors-only'
        },
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_DEBUG,
        autoWatch: true,
        browsers: ['Chrome'],
        mime: { 'application/javascript': ['ts', 'tsx'] },//needed?
        singleRun: true,
    });
};
