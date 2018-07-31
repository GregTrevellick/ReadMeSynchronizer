/// <binding AfterBuild='default' ProjectOpened='default' />
var gulp = require('gulp');
var bower = require('gulp-bower');//not needed ?
var replace = require('gulp-string-replace');

//Common variables
var prefix = "Badges";
var htmlCommentStart = "<!--" + prefix;
var htmlCommentEnd = "-->";
var badgeCommentStart = htmlCommentStart + "START" + htmlCommentEnd;
var badgeCommentEnd = htmlCommentStart + "END" + htmlCommentEnd;

//Tasks
gulp.task('ProduceBadgeMarkdownTask', function () { return ReplaceBadgeComments() });
//gulp.task('UnitTests', function () { return ReplaceBadgeComments('ProduceBadgeMarkdownTask') });
gulp.task('default', [ 'ProduceBadgeMarkdownTask' ]);

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
        var badgesMarkdown = GetBadgesMarkdown();
        ReplaceBadgeComment(repoFolderName, badgesMarkdown);
    });

    function GetBadgesMarkdown() {
        var lineBreak = '\n';

        var multipleBadgesMarkdown = GetMultipleBadgesMarkdown();

        var badgesMarkdownFull = badgeCommentStart + lineBreak + multipleBadgesMarkdown + badgeCommentEnd;

        return badgesMarkdownFull;

        function GetMultipleBadgesMarkdown() {
            let badgesMarkdownFinal;

            var badgesMarkdown =
                [
                    "badge1aaaa",
                    "badge2",
                    "badge3"
                ];

            badgesMarkdown.forEach(function (badgeMarkdown) {
                badgesMarkdownFinal += badgeMarkdown + lineBreak;
            });

            return badgesMarkdownFinal;
        }
    }

    function ReplaceBadgeComment(repoFolderName, badgesMarkdown) {
        var destination = "../../../" + repoFolderName;
        var source = destination + "/ReadMe.md";
        var matchAnyCharacter = '[^]+';//"don't match no characters" i.e. a double negative that can re-read as "match any character" i.e. even including line breaks
        var badgesRegex = new RegExp(badgeCommentStart + matchAnyCharacter + badgeCommentEnd, 'g');
        gulp.src([source])
            .pipe(replace(badgesRegex, badgesMarkdown))
            .pipe(gulp.dest(destination));
    } 
}


//vsixratingchaser NugetREADME.md
//openinapp dedicated readmes



//[![License](https://img.shields.io/github/license/gittools/gitlink.svg)](/LICENSE.txt)
//[![Access Lint github](https://img.shields.io/badge/a11y-checked-green.svg)](https://www.accesslint.com)
//[![GitHub top language](https://img.shields.io/github/languages/top/GregTrevellick/OpenInApp.Launcher.svg)](https://github.com/GregTrevellick/OpenInApp.Launcher)
//[![Github language count](https://img.shields.io/github/languages/count/GregTrevellick/OpenInApp.Launcher.svg)](https://github.com/GregTrevellick/OpenInApp.Launcher)
//[![GitHub pull requests](https://img.shields.io/github/issues-pr-raw/GregTrevellick/OpenInApp.Launcher.svg)](https://github.com/GregTrevellick/OpenInApp.Launcher)
//[![BetterCodeHub compliance](https://bettercodehub.com/edge/badge/GregTrevellick/OpenInApp.Launcher?branch=master)](https://bettercodehub.com/results/GregTrevellick/OpenInApp.Launcher)
//[![Codacy Badge](https://api.codacy.com/project/badge/Grade/e0cb8a23f42c4859aeb5c653b1a3d2b6)](https://www.codacy.com/project/gtrevellick/OpenInApp.Launcher/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=GregTrevellick/OpenInApp.Launcher&amp;utm_campaign=Badge_Grade_Dashboard)
//[![codecov](https://codecov.io/gh/GregTrevellick/OpenInApp.Launcher/branch/master/graph/badge.svg)](https://codecov.io/gh/GregTrevellick/OpenInApp.Launcher)
//[![CodeFactor](https://www.codefactor.io/repository/github/gregtrevellick/OpenInApp.Launcher/badge)](https://www.codefactor.io/repository/github/gregtrevellick/OpenInApp.Launcher)
//[![Appveyor Build status](https://ci.appveyor.com/api/projects/status/0vwmtcboontemltq?svg=true)](https://ci.appveyor.com/project/GregTrevellick/openinapp-launcher) 
//[![Appveyor unit tests](https://img.shields.io/appveyor/tests/GregTrevellick/OpenInApp-Launcher.svg)](https://ci.appveyor.com/project/GregTrevellick/OpenInApp-Launcher/build/tests)
//[![Travis Build Status](https://travis-ci.org/GregTrevellick/OpenInApp.Launcher.svg?branch=master)](https://travis-ci.org/GregTrevellick/OpenInApp.Launcher)
//[![ImgBot](https://img.shields.io/badge/images-optimized-green.svg)](https://imgbot.net/)
//[![Charity Ware](https://img.shields.io/badge/charity%20ware-thank%20you-brightgreen.svg)](https://github.com/GregTrevellick/MiscellaneousArtefacts/wiki/Charity-Ware)
//[![Access Lint social](https://img.shields.io/badge/a11y-accesslint-green.svg?style=social&label=a11y)](https://twitter.com/accesslint)

//##### vsts
//[![Visual Studio Marketplace version](https://img.shields.io/vscode-marketplace/v/GregTrevellick.vsts-extensions-tweets-Dev-Humor.svg)](https://marketplace.visualstudio.com/items?itemName=GregTrevellick.vsts-extensions-tweets-Dev-Humor)
//[![Visual Studio Marketplace downloads](https://img.shields.io/vscode-marketplace/d/GregTrevellick.vsts-extensions-tweets-Dev-Humor.svg)](https://marketplace.visualstudio.com/items?itemName=GregTrevellick.vsts-extensions-tweets-Dev-Humor)
//[![Visual Studio Marketplace ratings](https://img.shields.io/vscode-marketplace/r/GregTrevellick.vsts-extensions-tweets-Dev-Humor.svg)](https://marketplace.visualstudio.com/items?itemName=GregTrevellick.vsts-extensions-tweets-Dev-Humor#review-details)

//##### ide
//[![Visual Studio Marketplace version](https://vsmarketplacebadge.apphb.com/version/GregTrevellick.OpenInApp.Launcher.svg)](https://marketplace.visualstudio.com/items?itemName=GregTrevellick.OpenInApp.Launcher)
//[![Visual Studio Marketplace downloads](https://vsmarketplacebadge.apphb.com/installs/GregTrevellick.OpenInApp.Launcher.svg)](https://marketplace.visualstudio.com/items?itemName=GregTrevellick.OpenInApp.Launcher)
//[![Visual Studio Marketplace ratings](https://vsmarketplacebadge.apphb.com/rating/GregTrevellick.OpenInApp.Launcher.svg)](https://marketplace.visualstudio.com/items?itemName=GregTrevellick.OpenInApp.Launcher)

//##### nuget
//[![Nuget downloads](https://img.shields.io/nuget/dt/DotNetFlags.svg)](https://www.nuget.org/packages/DotNetFlags/)

//##### chrome
//[![Chrome webstore version](https://img.shields.io/chrome-web-store/v/fifncokofckhanlhmdacdnkbempmopbo.svg)](https://chrome.google.com/webstore/detail/visual-studio-marketplace/fifncokofckhanlhmdacdnkbempmopbo)
//[![Chrome webstore users](https://img.shields.io/chrome-web-store/users/fifncokofckhanlhmdacdnkbempmopbo.svg)](https://chrome.google.com/webstore/detail/visual-studio-marketplace/fifncokofckhanlhmdacdnkbempmopbo)
//[![Chrome webstore rating](https://img.shields.io/chrome-web-store/rating/fifncokofckhanlhmdacdnkbempmopbo.svg)](https://chrome.google.com/webstore/detail/visual-studio-marketplace/fifncokofckhanlhmdacdnkbempmopbo/reviews)
