//import { $enum } from "ts-enum-util";
import { FileSystemUpdater } from './FileSystemUpdater';
import { IRepoMetaData } from "./IRepoMetaData";
import { MarkdownProvider } from "./MarkdownProvider";
import { AllRepoMeta } from "./AllRepoMeta";

export class ReadMeUpdater {
    public replace = require('gulp-string-replace');
    public prefix: string = "Badges";
    private lineBreak: string = '\n';
    public htmlCommentStart: string = "<!--" + this.prefix;
    public htmlCommentEnd: string = "-->";
    public badgeCommentStart: string = this.htmlCommentStart + "START" + this.htmlCommentEnd;
    public badgeCommentEnd: string = this.htmlCommentStart + "END" + this.htmlCommentEnd;
    private fsu: FileSystemUpdater;
    private mp: MarkdownProvider;
    private allRepoMeta: AllRepoMeta;

    constructor() {
        this.fsu = new FileSystemUpdater;
        this.mp = new MarkdownProvider;
        this.allRepoMeta = new AllRepoMeta;
    }

    public ReplaceBadgeComments() {
        for (let repoMetaData of this.allRepoMeta.repoMetaDatas) {
            let badgesMarkdown = this.GetBadgesMarkdown(repoMetaData);
            this.fsu.ReplaceBadgeCommentOnDisc(repoMetaData.repoLocalDiscName, badgesMarkdown, this.badgeCommentStart, this.badgeCommentEnd);
        }
    }

    private GetBadgesMarkdown(repoMetaData: IRepoMetaData) {
        let multipleBadgesMarkdown = this.GetMultipleBadgesMarkdown(repoMetaData);
        return `${this.badgeCommentStart}${this.lineBreak}${multipleBadgesMarkdown}${this.badgeCommentEnd}`;
    }

    private GetMultipleBadgesMarkdown(repoMetaData: IRepoMetaData) {
        let badgesMarkdownFinal: string = "";

        let repoBadgesMarkdown = this.GetRepoBadgesMarkdown(repoMetaData);

        //TODO: VsIdeExtensions

        //combine all badges, with line breaks
        repoBadgesMarkdown.forEach(function (badgeMarkdown) {
            badgesMarkdownFinal += `
${badgeMarkdown}`;
        });

        return badgesMarkdownFinal;
    }

    private GetRepoBadgesMarkdown(repoMetaData: IRepoMetaData) {

        let repoBadgesMarkdown = this.GetSharedBadgesMarkdown(repoMetaData.appNickName);

        let repoTypeSpecificMarkdown: string[] = this.GetRepoTypeSpecificMarkdown(repoMetaData);

        repoBadgesMarkdown = repoBadgesMarkdown.concat(repoTypeSpecificMarkdown);

        return repoBadgesMarkdown;
    }

    private GetRepoTypeSpecificMarkdown(repoMetaData: IRepoMetaData) {

        let repoTypeSpecificMarkdown: string[] = [];

        if (repoMetaData.isChromeExtension) {
            let chromeExtensionsBadgesMarkdown = this.GetChromeExtensionsBadgesMarkdown(repoMetaData.appNickName);
            repoTypeSpecificMarkdown = repoTypeSpecificMarkdown.concat(chromeExtensionsBadgesMarkdown);
        }

        if (repoMetaData.isNugetPackage) {
            let nugetBadgesMarkdown = this.GetNugetBadgesMarkdown(repoMetaData.appNickName);
            repoTypeSpecificMarkdown = repoTypeSpecificMarkdown.concat(nugetBadgesMarkdown);
        }

        if (repoMetaData.isSpecialRepo) {
            let specialReposBadgesMarkdown = this.GetSpecialReposBadgesMarkdown(repoMetaData.appNickName);
            repoTypeSpecificMarkdown = repoTypeSpecificMarkdown.concat(specialReposBadgesMarkdown);
        }

        if (repoMetaData.isVstsExtension) {
            let vstsExtensionsBadgesMarkdown = this.GetVstsExtensionsBadgesMarkdown(repoMetaData.appNickName);
            repoTypeSpecificMarkdown = repoTypeSpecificMarkdown.concat(vstsExtensionsBadgesMarkdown);
        }

        return repoTypeSpecificMarkdown;
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
