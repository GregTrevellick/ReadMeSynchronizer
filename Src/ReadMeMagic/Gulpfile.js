/// <binding AfterBuild='default' ProjectOpened='default' />

//"use strict";

//Requires
var gulp = require('gulp');
const run = require("gulp-run");
var Server = require('karma').Server;

//Tasks
require('./GulpTasks/update_readme_files_task.ts');
gulp.task("lint", () => run("npm run lint").exec());
gulp.task("lint_fix", () => run("npm run lint -- --fix").exec());

//just in case...
//var bower = require('gulp-bower');
//var tsnode = require('ts-node');
