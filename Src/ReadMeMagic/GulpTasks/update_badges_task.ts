import * as gulp from 'gulp';

gulp.task('update_badges_readmes', () => {

    var replace = require('gulp-string-replace');

    //Common variables
    let prefix: string = "Badges";
    let htmlCommentStart: string  = "<!--" + prefix;
    let htmlCommentEnd: string  = "-->";
    let badgeCommentStart: string  = htmlCommentStart + "START" + htmlCommentEnd;
    let badgeCommentEnd: string  = htmlCommentStart + "END" + htmlCommentEnd;

    ReplaceBadgeComments();

    function ReplaceBadgeComments() {

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
            var badgesMarkdown = GetBadgesMarkdown();
            ReplaceBadgeComment(repoFolderName, badgesMarkdown);
        });

        function GetBadgesMarkdown() {
            var lineBreak = '\n';

            var multipleBadgesMarkdown = GetMultipleBadgesMarkdown();

            var badgesMarkdownFull = badgeCommentStart + lineBreak + multipleBadgesMarkdown + badgeCommentEnd;

            return badgesMarkdownFull;

            function GetMultipleBadgesMarkdown() {
                let badgesMarkdownFinal:string = "";

                var badgesMarkdown =
                    [
                        "badge1aaaa",
                        "badge2bbb",
                        "badge2bbbeeeeeee",
                        "badge3cccc"
                    ];

                badgesMarkdown.forEach(function (badgeMarkdown) {
                    badgesMarkdownFinal += badgeMarkdown + lineBreak;
                });

                return badgesMarkdownFinal;
            }
        }

        function ReplaceBadgeComment(repoFolderName:string, badgesMarkdown:string) {
            let destination :string = "../../../" + repoFolderName;
            let source: string  = destination + "/ReadMe.md";
            let matchAnyCharacter: string  = '[^]+';//"don't match no characters" i.e. a double negative that can re-read as "match any character" i.e. even including line breaks
            var badgesRegex = new RegExp(badgeCommentStart + matchAnyCharacter + badgeCommentEnd, 'g');
            gulp.src([source])
                .pipe(replace(badgesRegex, badgesMarkdown))
                .pipe(gulp.dest(destination));
        }
    }
});
