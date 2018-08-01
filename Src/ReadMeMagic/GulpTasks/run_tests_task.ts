import * as gulp from 'gulp';

const run = require("gulp-run");

gulp.task("run_karma_tests", function () {
    return run("karma start ./UnitTests/karma.conf.js").exec();
});