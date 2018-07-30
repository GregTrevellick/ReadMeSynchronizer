/// <binding AfterBuild='default' ProjectOpened='default' />

var gulp = require('gulp');
var bower = require('gulp-bower');//not needed ?
var replace = require('gulp-string-replace');

//var lineBreakRegex = "[^\n]+";
var htmlCommentStart = "<!--";
var htmlCommentEnd = "-->";

var prefix = "Badges";
var start = htmlCommentStart + prefix + "START" + htmlCommentEnd;//+ lineBreakRegex;
var end = htmlCommentStart + prefix + "END" + htmlCommentEnd;

//////////////////var regexMiddle = '(.*)'; 
//////////////////var regexMiddle = '(.|[\r\n])';
//////////////////var regexMiddle1 = '[\s\S]';
//////////////////var regexMiddle = '(.|\r|\n)';
//////////////////var regexMiddle = '[^]';
//////////////////var regexMiddle = '(.*|\r|\n)'; 
//////////////////var regexMiddle = '(.*|[\s\S])'; 
var regexMiddle = '[^]+';

var badgesRegex = new RegExp(start + regexMiddle + end, 'g');

var newBadgesMarkdown = start + '\nbadge1b\nbadge2b\nbadge3b\n' + end;

gulp.task('MyTaskNam', function () { return OIAConcat('MyTaskNam') });

gulp.task('default',
    [
        'MyTaskNam',
    ]
);

function OIAConcat (appNam) { 

    var repos = [
        "SolutionOpenPopUp",
        "VsixFootie",
        "DotNetFlags"
    ];

    repos.forEach(function (entry) {
        OIAConcat2(entry);
    });

    function OIAConcat2(appNam) {

        console.log("badgesRegex= " + badgesRegex);

        gulp.src(["readme4.md"])
            .pipe(replace(badgesRegex, newBadgesMarkdown + appNam))
            .pipe(gulp.dest('.'));
    } 
}