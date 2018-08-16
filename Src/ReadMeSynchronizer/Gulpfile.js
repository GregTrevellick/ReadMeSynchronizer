/// <binding AfterBuild='default' ProjectOpened='default' />

//"use strict";

let gulp = require('gulp');
const run = require("gulp-run");
let Server = require('karma').Server;

require('./GulpTasks/GitTasks.ts');
gulp.task("Lint", () => run("npm run lint").exec());
gulp.task("Lint_Fix", () => run("npm run lint -- --fix").exec());
require('./GulpTasks/MarkdownTasks.ts');
