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

gulp.task('MyTaskName', function () { return ReplaceForEveryRepo('MyTaskName') });

gulp.task('default',
    [
        'MyTaskName',
    ]
);

function ReplaceForEveryRepo (appNam) { 
    var repos = [
        "SolutionOpenPopUp",
        "VsixFootie",
        "DotNetFlags"
    ];

    repos.forEach(function (entry) {
        ReplaceBetweenStartAndEndHtmlComment(entry);
    });

    function ReplaceBetweenStartAndEndHtmlComment(repoFolderName) {
        var source = "../../../" + repoFolderName + "/ReadMe.md";
        var destination = "../../../" + repoFolderName + "/ReadMe.md";

        gulp.src([source])
            .pipe(replace(badgesRegex, newBadgesMarkdown))
            .pipe(gulp.dest(destination));
    } 
}