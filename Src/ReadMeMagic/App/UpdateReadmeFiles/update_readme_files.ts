import * as gulp2 from 'gulp';
import { MarkdownProvider } from "./MarkdownProvider";
import { RepoNames } from './MagicStrings';

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
            RepoNames.AutoFindReplace,
            //RepoNames.BadgesPlayground,
            RepoNames.DotNetFlags,
            RepoNames.FilesForEveryExtensionCreator,
            RepoNames.HelloWorldVstsExtension,
            RepoNames.OpenInAppLauncher,
            RepoNames.QuickLaunchButtons,
            RepoNames.QuizLauncher,
            RepoNames.SolutionOpenPopUp,
            RepoNames.TrivialApisForIDE,
            RepoNames.VisualStudioMarketplaceMetrics,
            RepoNames.VsixFootie,
            RepoNames.VsixHelloWorldCommandButton,
            RepoNames.VsixHelloWorldPopUp,
            RepoNames.VsixHelloWorldToolBar,
            RepoNames.VsixRatingChaser,
            RepoNames.VsixToolWindowAsyncPackageExample,
            RepoNames.VsixTwitterWidget,
            RepoNames.VstsDashboardWidgetProjectTemplate,
            RepoNames.WpfAsyncBindingPropertyExample,
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
                //Do not resequence alphabetically - this is the order we want them to appear in UI
                this.mp.GetLicenceBadgeMarkdown(), 
                this.mp.GetAccessLintBadgeMarkdown(),
                this.mp.GetGitHubTopLanguage(repoFolderName),
                this.mp.GetGitHubLanguageCount(repoFolderName),
                this.mp.GetGitHubPullRequests(repoFolderName),
                this.mp.GetBetterCodeHubCompliance(repoFolderName),
                this.mp.GetCodacyBadge(repoFolderName),
                this.mp.GetCodeCov(repoFolderName),
                this.mp.GetCodeFactor(repoFolderName),
                this.mp.GetAppveyorBuildStatus(repoFolderName),
                this.mp.GetAppveyorUnitTests(repoFolderName),
                this.mp.GetTravisBuildStatus(repoFolderName),
                this.mp.GetImgBot(repoFolderName),
                this.mp.GetCharityWare(repoFolderName),
                this.mp.GetAccessLintSocial(repoFolderName),
            ];
        badgesMarkdown.forEach(function (badgeMarkdown, lineBreak) {
            badgesMarkdownFinal += badgeMarkdown + lineBreak;
        });
        return badgesMarkdownFinal;
    }

    //gregt extract to own class
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
