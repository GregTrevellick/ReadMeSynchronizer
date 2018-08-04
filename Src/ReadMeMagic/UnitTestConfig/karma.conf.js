module.exports = function (config) {
    config.set({
        basePath: '.',
        frameworks: ['jasmine'],
        //preprocessors: {
        //    'test-context.js': ['webpack']
        //},
        //webpack: {
        //    module: {
        //        loaders: [
        //            { test: /\.js/, exclude: /node_modules/, loader: 'babel-loader' }
        //        ]
        //    },
        //    watch: true
        //},
        //webpackServer: {
        //    noInfo: true
        //},
        files: [
            '../App/UpdateReadmeFiles/update_readme_files.spec.ts'
            //'*.js'//ReadMeMagic/UnitTestConfig/*.js files excluded 
            //'tests/*.js'//ReadMeMagic/UnitTestConfig/tests/*.js files excluded 
        ],
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
