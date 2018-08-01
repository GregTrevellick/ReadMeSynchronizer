module.exports = function (config) {
    config.set({
        basePath: '.',
        frameworks: ['jasmine'],
        //plugins: [
        //    require('karma-jasmine'),
        //    require('karma-chrome-launcher'),
        ////    require('karma-jasmine-html-reporter')
        ////    require('karma-coverage-istanbul-reporter'),
        ////    //require('@angular/cli/plugins/karma')
        //],
        //client: {
        //    clearContext: false // leave Jasmine Spec Runner output visible in browser
        //},
        //coverageIstanbulReporter: {
        //    reports: ['html', 'lcovonly'],
        //    fixWebpackSourcePaths: true
        //},
        files: [
            '*.js',
            //'tests/*.js'
        ],
        reporters: ['progress'],// 'kjhtml'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_ERROR,
        autoWatch: true,
        browsers: ['Chrome'],
        //mime: { 'application/javascript': ['ts', 'tsx'] },
        singleRun: true,
    });
};