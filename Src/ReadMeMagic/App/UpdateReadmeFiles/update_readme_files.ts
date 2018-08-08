import * as gulp2 from 'gulp';
import { MarkdownProvider } from "./MarkdownProvider";

export class ReadMeUpdater {
    public replace = require('gulp-string-replace');
    public prefix: string = "Badges";
    public htmlCommentStart: string = "<!--" + this.prefix;
    public htmlCommentEnd: string = "-->";
    public badgeCommentStart: string = this.htmlCommentStart + "START" + this.htmlCommentEnd;
    public badgeCommentEnd: string = this.htmlCommentStart + "END" + this.htmlCommentEnd;
    private mp: MarkdownProvider;

    constructor() {
        this.mp = new MarkdownProvider;
    }

    public ReplaceBadgeComments() {
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
        for (let repoFolderName of repos) {
            this.Rrr(repoFolderName)
        }
    }

    public Rrr(repoFolderName: string) {
        var badgesMarkdown = this.GetBadgesMarkdown(repoFolderName);
        this.ReplaceBadgeComment(repoFolderName, badgesMarkdown);
    }

    public GetBadgesMarkdown(repoFolderName: string) {
        var lineBreak = '\n';
        var multipleBadgesMarkdown = this.GetMultipleBadgesMarkdown(lineBreak, repoFolderName);
        var badgesMarkdownFull = this.badgeCommentStart + lineBreak + multipleBadgesMarkdown + this.badgeCommentEnd;
        return badgesMarkdownFull;
    }

    public GetMultipleBadgesMarkdown(lineBreak: string, repoFolderName: string) {
        let badgesMarkdownFinal: string = "";
        var badgesMarkdown =
            [
                this.mp.GetLicenceBadgeMarkdown(), 
                this.mp.GetAccessLintBadgeMarkdown(),
                "[![GitHub top language](https://img.shields.io/github/languages/top/GregTrevellick/OpenInApp.Launcher.svg)](" + this.mp.GetGitHubUrlForRepo(repoFolderName) + ")",
                "[![Github language count](https://img.shields.io/github/languages/count/GregTrevellick/OpenInApp.Launcher.svg)](" + this.mp.GetGitHubUrlForRepo(repoFolderName) +")",
                "[![GitHub pull requests](https://img.shields.io/github/issues-pr-raw/GregTrevellick/OpenInApp.Launcher.svg)](" + this.mp.GetGitHubUrlForRepo(repoFolderName) +")"
            ];
        badgesMarkdown.forEach(function (badgeMarkdown, lineBreak) {
            badgesMarkdownFinal += badgeMarkdown + lineBreak;
        });
        return badgesMarkdownFinal;
    }

    public ReplaceBadgeComment(repoFolderName: string, badgesMarkdown: string) {
        let destination: string = "../../../" + repoFolderName;
        let source: string = destination + "/ReadMe.md";
        let matchAnyCharacter: string = '[^]+';//"don't match no characters" i.e. a double negative that can re-read as "match any character" i.e. even including line breaks
        var badgesRegex = new RegExp(this.badgeCommentStart + matchAnyCharacter + this.badgeCommentEnd, 'g');
        gulp2.src([source])
            .pipe(this.replace(badgesRegex, badgesMarkdown))
            .pipe(gulp2.dest(destination));
    }
}
