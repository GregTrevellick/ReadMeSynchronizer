import { MarkdownProvider } from "./MarkdownProvider";
import { RepoNames } from './MagicStrings';
import { FileSystemUpdater } from './FileSystemUpdater';
//import { $enum } from "ts-enum-util";

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
        //const repoNamesValues = $enum(RepoNames).getValues();
        const repoNamesValues = rn.GetRepoNames();
        for (let repoFolderName of repoNamesValues) {
            var badgesMarkdown = this.GetBadgesMarkdown(repoFolderName);
            this.fsu.ReplaceBadgeCommentOnDisc(repoFolderName, badgesMarkdown, this.badgeCommentStart, this.badgeCommentEnd);
        }
    }

    private GetBadgesMarkdown(repoFolderName: string) {
        var lineBreak = '\n';
        var multipleBadgesMarkdown = this.GetMultipleBadgesMarkdown(lineBreak, repoFolderName);
        var badgesMarkdownFull = this.badgeCommentStart + lineBreak + multipleBadgesMarkdown + this.badgeCommentEnd;
        return badgesMarkdownFull;
    }

    private GetMultipleBadgesMarkdown(lineBreak: string, repoFolderName: string) {
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
}
