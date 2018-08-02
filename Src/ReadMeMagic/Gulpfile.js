/// <binding AfterBuild='default' ProjectOpened='default' />
//"use strict";
var gulp = require('gulp');
//var bower = require('gulp-bower');
var Server = require('karma').Server;
//var tsnode = require('ts-node');
require('./GulpTasks/update_readme_files_task.ts');
require('./GulpTasks/run_tests_task.ts');