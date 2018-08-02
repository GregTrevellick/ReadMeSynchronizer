/// <binding AfterBuild='default' ProjectOpened='default' />
//"use strict";
var gulp = require('gulp');
const run = require("gulp-run");
//var bower = require('gulp-bower');
var Server = require('karma').Server;
//var tsnode = require('ts-node');
require('./GulpTasks/update_readme_files_task.ts');
require('./GulpTasks/run_tests_task.ts');

gulp.task("lint", () => run("npm run lint").exec());
gulp.task("lint_fix", () => run("npm run lint -- --fix").exec());