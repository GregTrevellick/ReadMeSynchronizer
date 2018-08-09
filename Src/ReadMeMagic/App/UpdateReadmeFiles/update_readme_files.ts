import { MarkdownProvider } from "./MarkdownProvider";
import { RepoNames, ChromeExtensions, NugetPackages } from './MagicStrings';
import { FileSystemUpdater } from './FileSystemUpdater';
import { $enum } from "ts-enum-util";

export class ReadMeUpdater {
    public replace = require('gulp-string-replace');
    public prefix: string = "Badges";
    public htmlCommentStart: string = "<!--" + this.prefix;
    public htmlCommentEnd: string = "-->";
    public badgeCommentStart: string = this.htmlCommentStart + "START" + this.htmlCommentEnd;
    public badgeCommentEnd: string = this.htmlCommentStart + "END" + this.htmlCommentEnd;
    private fsu: FileSystemUpdater;
    private mp: MarkdownProvider;
    private rn: RepoNames;

    constructor() {
        this.fsu = new FileSystemUpdater;
        this.mp = new MarkdownProvider;
        this.rn = new RepoNames;
    }

    public ReplaceBadgeComments() {
        const repoNamesValues = this.rn.GetRepoNames();//gregt put in ctor ?
        for (let repoFolderName of repoNamesValues) {
            var badgesMarkdown = this.GetBadgesMarkdown(repoFolderName);
            this.fsu.ReplaceBadgeCommentOnDisc(repoFolderName, badgesMarkdown, this.badgeCommentStart, this.badgeCommentEnd);
        }
    }

    private GetBadgesMarkdown(repoFolderName: string) {
        var lineBreak = '\n';
        var multipleBadgesMarkdown = this.GetMultipleBadgesMarkdown(repoFolderName);
        var badgesMarkdownFull = this.badgeCommentStart + lineBreak + multipleBadgesMarkdown + this.badgeCommentEnd;
        return badgesMarkdownFull;
    }

    private GetMultipleBadgesMarkdown(repoFolderName: string) {
        let badgesMarkdownFinal: string = "";

        var sharedBadgesMarkdown = this.GetSharedBadgesMarkdown(repoFolderName);

        if ($enum(ChromeExtensions).isValue(repoFolderName)) {
            sharedBadgesMarkdown.push("chrome_chrome_chrome_chrome_chrome_chrome_chrome_");
        }

        if ($enum(NugetPackages).isValue(repoFolderName)) {
            sharedBadgesMarkdown.push("NugetPackages_NugetPackages_NugetPackages_NugetPackages_");
        }

        //if repoFolderName exists in VstsExtensions then append 'sharedBadgesMarkdown' with vsts badges
        //if repoFolderName exists in VsIdeExtensions then append 'sharedBadgesMarkdown' with ide badges
        //if repoFolderName = BadgePlayground then set 'sharedBadgesMarkdown' to 'sharedBadgesMarkdownBadgePlayground' where 'sharedBadgesMarkdownBadgePlayground' is the pull requests, code quality, download counts for all repos

        //combine all badges, with line breaks
        sharedBadgesMarkdown.forEach(function (badgeMarkdown) {
            badgesMarkdownFinal += `
${badgeMarkdown}`;
        });

        return badgesMarkdownFinal;
    }

    private GetSharedBadgesMarkdown(repoFolderName: string) {
        return [
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
    }
}
