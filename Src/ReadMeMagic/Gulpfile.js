/// <binding AfterBuild='default' ProjectOpened='default' />

var gulp = require('gulp');
var bower = require('gulp-bower');//not needed ?
var replace = require('gulp-string-replace');

var lineBreakRegex = "[^\n]+";
var htmlCommentStart = "<!--";
var htmlCommentEnd = "-->";

var prefix = "Badges";
//var start = htmlCommentStart + prefix + "START" + htmlCommentEnd + lineBreakRegex;
//var end = lineBreakRegex + htmlCommentStart + prefix + "END" + htmlCommentEnd;
var start = htmlCommentStart + prefix + "START" + htmlCommentEnd;
var end = htmlCommentStart + prefix + "END" + htmlCommentEnd;
var badgesRegex = new RegExp(start + '(.*)' + end, 'g');

var newBadgesMarkdown = start + 'figure out line breaks' + end;

gulp.task('MyTaskNam', function () { return OIAConcat('MyTaskNam') });

gulp.task('default',
    [
        'MyTaskNam',
    ]
);

function OIAConcat (appNam) { 

    var a = ["a", "b", "c"];
    a.forEach(function (entry) {
        console.log(entry);
    });

    var repos = [
        "SolutionOpenPopUp",
        "VsixFootie",
        "DotNetFlags"
    ];

    repos.forEach(OIAConcat2(appNam));
} 

function OIAConcat2(appNam) {
    gulp.src(["readme4.md"])
        .pipe(replace(badgesRegex, newBadgesMarkdown))
        .pipe(gulp.dest('.'));
} 