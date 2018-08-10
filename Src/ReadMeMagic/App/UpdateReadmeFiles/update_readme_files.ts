//import { $enum } from "ts-enum-util";
import { MarkdownProvider } from "./MarkdownProvider";
import { FileSystemUpdater } from './FileSystemUpdater';
import { RepoNames, RepoMeta } from "./MagicObjects";

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
        for (let repoMeta of this.rn.repoMetas) {
            var badgesMarkdown = this.GetBadgesMarkdown(repoMeta);
            this.fsu.ReplaceBadgeCommentOnDisc(repoMeta.repoLocalDiscName, badgesMarkdown, this.badgeCommentStart, this.badgeCommentEnd);
        }
    }

    private GetBadgesMarkdown(repoMeta: RepoMeta) {
        var lineBreak = '\n';
        var multipleBadgesMarkdown = this.GetMultipleBadgesMarkdown(repoMeta);
        var badgesMarkdownFull = this.badgeCommentStart + lineBreak + multipleBadgesMarkdown + this.badgeCommentEnd;
        return badgesMarkdownFull;
    }

    private GetMultipleBadgesMarkdown(repoMeta: RepoMeta) {
        let badgesMarkdownFinal: string = "";

        var sharedBadgesMarkdown = this.GetSharedBadgesMarkdown(repoMeta.appNickName);

        if (repoMeta.isChromeExtension) {
            var chromeExtensionsBadgesMarkdown = this.GetChromeExtensionsBadgesMarkdown(repoMeta.appNickName);
            sharedBadgesMarkdown = sharedBadgesMarkdown.concat(chromeExtensionsBadgesMarkdown);
        }

        if (repoMeta.isNugetPackage) {
            var nugetBadgesMarkdown = this.GetNugetBadgesMarkdown(repoMeta.appNickName);
            sharedBadgesMarkdown = sharedBadgesMarkdown.concat(nugetBadgesMarkdown);
        }

        if (repoMeta.isSpecialRepo) {
            var specialReposBadgesMarkdown = this.GetSpecialReposBadgesMarkdown(repoMeta.appNickName);
            sharedBadgesMarkdown = sharedBadgesMarkdown.concat(specialReposBadgesMarkdown);
        }

        if (repoMeta.isVstsExtension) {
            var vstsExtensionsBadgesMarkdown = this.GetVstsExtensionsBadgesMarkdown(repoMeta.appNickName);
            sharedBadgesMarkdown = sharedBadgesMarkdown.concat(vstsExtensionsBadgesMarkdown);
        }

        //TODO: VsIdeExtensions

        //combine all badges, with line breaks
        sharedBadgesMarkdown.forEach(function (badgeMarkdown) {
            badgesMarkdownFinal += `
${badgeMarkdown}`;
        });

        return badgesMarkdownFinal;
    }

    private GetChromeExtensionsBadgesMarkdown(repoFolderName: string) {
        return [
            this.mp.GetChromeWebstoreVersion(repoFolderName),
            this.mp.GetChromeWebstoreUsers(repoFolderName),
            this.mp.GetChromeWebstoreRating(repoFolderName),
        ];
    }

    private GetNugetBadgesMarkdown(repoFolderName: string) {
        return [
            this.mp.GetNugetDownloads(repoFolderName),
        ];
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

    private GetSpecialReposBadgesMarkdown(repoFolderName: string) {
        //set 'sharedBadgesMarkdown' to the pull requests, code quality, download counts for all repos
        return [
            //TODO
        ];
    }

    private GetVstsExtensionsBadgesMarkdown(repoFolderName: string) {
        return [
            this.mp.GetVisualStudioMarketplaceVSTSDownloads(repoFolderName),
            this.mp.GetVisualStudioMarketplaceVSTSRatings(repoFolderName),
            this.mp.GetVisualStudioMarketplaceVSTSVersion(repoFolderName),
        ];
    }
}
