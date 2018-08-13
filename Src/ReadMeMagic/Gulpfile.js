/// <binding AfterBuild='default' ProjectOpened='default' />

//"use strict";

//Requires
let gulp = require('gulp');
const run = require("gulp-run");
let Server = require('karma').Server;

//Tasks
require('./GulpTasks/UpdateReadMeFilesTask.ts');
require('./GulpTasks/GitTasks.ts');
gulp.task("lint", () => run("npm run lint").exec());
gulp.task("lint_fix", () => run("npm run lint -- --fix").exec());
