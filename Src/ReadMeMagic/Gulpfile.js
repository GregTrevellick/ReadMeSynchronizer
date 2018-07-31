﻿/// <binding AfterBuild='default' ProjectOpened='default' />
var gulp = require('gulp');
var bower = require('gulp-bower');//not needed ?
var replace = require('gulp-string-replace');

var prefix = "Badges";
var htmlCommentStart = "<!--" + prefix;
var htmlCommentEnd = "-->";
var badgeCommentStart = htmlCommentStart + "START" + htmlCommentEnd;
var badgeCommentEnd = htmlCommentStart + "END" + htmlCommentEnd;
var matchAnyCharacter = '[^]+';//means "don't match no characters" i.e. a double negative that can re-read as "match any character" i.e. even including line breaks
var badgesRegex = new RegExp(badgeCommentStart + matchAnyCharacter + badgeCommentEnd, 'g');

var lineBreak = '\n';
var badgesMarkdownPartial = 'badge aaa3' + lineBreak + 'badge bbb' + lineBreak + 'badge ccc' + lineBreak ;
var badgesMarkdown = badgeCommentStart + lineBreak + badgesMarkdownPartial + badgeCommentEnd;

gulp.task('MyTaskName', function () { return ReplaceBadgeComments('MyTaskName') });

gulp.task('default', [ 'MyTaskName' ]);

function ReplaceBadgeComments (appNam) { 
    var repos = [
        "AutoFindReplace",
        //"Badges-playground",
        "DotNetFlags",
        "FilesForEveryExtensionCreator",
        "HelloWorldVstsExtension",
        "OpenInApp.Launcher",
        "QuickLaunchButtons",
        "Quiz.Launcher",
        "SolutionOpenPopUp",
        "TrivialApisForIDE",
        "VisualStudioMarketplaceMetrics",
        "VsixFootie",
        "VsixHelloWorldCommandButton",
        "VsixHelloWorldPopUp",
        "VsixHelloWorldToolBar",
        "VsixRatingChaser",
        "VsixToolWindowAsyncPackageExample",
        "VsixTwitterWidget",
        "VstsDashboardWidgetProjectTemplate",
        "WpfAsyncBindingPropertyExample",
    ];

    repos.forEach(function (repoFolderName) {
        ReplaceBadgeComment(repoFolderName);
    });

    function ReplaceBadgeComment(repoFolderName) {
        var destination = "../../../" + repoFolderName;
        var source = destination + "/ReadMe.md";
        gulp.src([source])
            .pipe(replace(badgesRegex, badgesMarkdown))
            .pipe(gulp.dest(destination));
    } 
}

//vsixratingchaser NugetREADME.md
//openinapp dedicated readmes