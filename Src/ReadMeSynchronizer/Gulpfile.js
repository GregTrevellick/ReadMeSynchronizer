/// <binding AfterBuild='default' ProjectOpened='default' />

"use strict";

const gulp = require("gulp");
const run = require("gulp-run");
const Server = require('karma').Server;

//these 4 lines make things appear in task runner explorer
require('./GulpTasks/GitTasks.ts');
require('./GulpTasks/MarkdownTasks.ts');
gulp.task("Lint", () => run("npm run lint").exec());
gulp.task("Lint_Fix", () => run("npm run lint -- --fix").exec());

gulp.task('Test', () => {
	console.log('Gulp is running!');
});
