/// <binding AfterBuild='default' ProjectOpened='default' />
var gulp = require('gulp');
var bower = require('gulp-bower');//not needed ?

//    from: '<!-- Badges START -->',
//    to: '<!-- Badges END -->',

var start = "This is";
var end = "sentence";

var replace = require('gulp-string-replace');

gulp.task('OpenInAbracadabra', function () { return OIAConcat('OpenInAbracadabra', 'Abracadabra') });

gulp.task('default',
    ['OpenInAbracadabra']);

function OIAConcat (appNam, appDesc) { 
        gulp.src(["readme4.md"])
            //.pipe(replace(new RegExp('This is(.*)sentence', 'g'), 'This isPRODUCTION PRODUCTION sentence'))
            .pipe(replace(new RegExp(start+'(.*)'+end, 'g'), start+'PRODUCTION 2222'+end))
            .pipe(gulp.dest('.'));
} 
