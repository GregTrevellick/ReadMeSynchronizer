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

    private GetChromeExtensionsBadgesMarkdown(appNickName: string) {
        return [
            this.mp.GetChromeWebstoreVersion(appNickName),
            this.mp.GetChromeWebstoreUsers(appNickName),
            this.mp.GetChromeWebstoreRating(appNickName),
        ];
    }

    private GetNugetBadgesMarkdown(appNickName: string) {
        return [
            this.mp.GetNugetDownloads(appNickName),
        ];
    }

    private GetSharedBadgesMarkdown(appNickName: string) {
        return [
            this.mp.GetLicenceBadgeMarkdown(),
            this.mp.GetAccessLintBadgeMarkdown(),
            this.mp.GetGitHubTopLanguage(appNickName),
            this.mp.GetGitHubLanguageCount(appNickName),
            this.mp.GetGitHubPullRequests(appNickName),
            this.mp.GetBetterCodeHubCompliance(appNickName),
            this.mp.GetCodacyBadge(appNickName),
            this.mp.GetCodeCov(appNickName),
            this.mp.GetCodeFactor(appNickName),
            this.mp.GetAppveyorBuildStatus(appNickName),
            this.mp.GetAppveyorUnitTests(appNickName),
            this.mp.GetTravisBuildStatus(appNickName),
            this.mp.GetImgBot(appNickName),
            this.mp.GetCharityWare(appNickName),
            this.mp.GetAccessLintSocial(appNickName),
        ];
    }

    private GetSpecialReposBadgesMarkdown(appNickName: string) {

        let badgesMarkdown = "";

        let allReposExceptSpecials = this.allRepoMeta.repoMetaDatas.filter(x => x.appNickName != "BadgesPlayground");

        for (let repoMetaData of allReposExceptSpecials) {
            badgesMarkdown = badgesMarkdown + "#### " + repoMetaData.appNickName + this.GetBadgesMarkdown(repoMetaData);
        }

        return badgesMarkdown;
    }

    private GetVstsExtensionsBadgesMarkdown(appNickName: string) {
        return [
            this.mp.GetVisualStudioMarketplaceVSTSDownloads(appNickName),
            this.mp.GetVisualStudioMarketplaceVSTSRatings(appNickName),
            this.mp.GetVisualStudioMarketplaceVSTSVersion(appNickName),
        ];
    }
}
