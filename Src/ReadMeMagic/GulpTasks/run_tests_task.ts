import * as gulp from 'gulp';

//gulp.task('run_karma_tests', () => {

//    var Server = require('karma').Server;

//    new Server({
//        configFile: __dirname + '..\\tests\\karma.conf.js'
//    }).start();
//});

const run = require("gulp-run");

gulp.task("run_karma_tests", function () {
    return run("karma start ./tests/karma.conf.js").exec();
});