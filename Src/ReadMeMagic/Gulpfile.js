/// <binding AfterBuild='default' ProjectOpened='default' />
var gulp = require('gulp');
var bower = require('gulp-bower');//not needed ?
var htmlCommentStart = "<!--";
var htmlCommentEnd = "-->";
var prefix = "Badges";
var start = htmlCommentStart + prefix + "START" + htmlCommentEnd;
var end = htmlCommentStart + prefix + "END" + htmlCommentEnd;
var badgesRegex = new RegExp(start + '(.*)' + end, 'g');
var newBadgesMarkdown = start + 'figure out line breaks' + end;
var replace = require('gulp-string-replace');

gulp.task('OpenInAbracadabra', function () { return OIAConcat('OpenInAbracadabra', 'Abracadabra') });

gulp.task('default',
    ['OpenInAbracadabra']);

function OIAConcat (appNam, appDesc) { 
        gulp.src(["readme4.md"])
            .pipe(replace(badgesRegex, newBadgesMarkdown))
            .pipe(gulp.dest('.'));
} 