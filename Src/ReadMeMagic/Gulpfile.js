/// <binding AfterBuild='default' ProjectOpened='default' />
var gulp = require('gulp');
var bower = require('gulp-bower');//not needed ?
var replace = require('gulp-string-replace');

var htmlCommentStart = "<!--";
var htmlCommentEnd = "-->";
var prefix = "Badges";
var start = htmlCommentStart + prefix + "START" + htmlCommentEnd;//<!--BadgesSTART-->
var end = htmlCommentStart + prefix + "END" + htmlCommentEnd;//<!--BadgesEND-->
var regexMiddle = '[^]+';//means ‘don’t match no characters’, a double negative that can re-read as ‘match any character’ i.e. even including line breaks
var badgesRegex = new RegExp(start + regexMiddle + end, 'g');
var lineBreak = '\n';
var newBadgesMarkdown = start + lineBreak + 'badge aaa' + lineBreak + 'badge bbb' + lineBreak + 'badgeddd' + lineBreak + 'badge eeeeeee' + lineBreak + end;

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
        gulp.src(["readme4.md"])
            .pipe(replace(badgesRegex, newBadgesMarkdown))
            .pipe(gulp.dest('.'));
    } 
}