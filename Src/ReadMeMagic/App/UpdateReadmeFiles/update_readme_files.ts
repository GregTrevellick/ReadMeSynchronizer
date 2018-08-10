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

        let repoBadgesMarkdown = this.GetSharedBadgesMarkdown(repoMetaData.hostedRepoName);

        let repoTypeSpecificMarkdown: string[] = this.GetRepoTypeSpecificMarkdown(repoMetaData);

        repoBadgesMarkdown = repoBadgesMarkdown.concat(repoTypeSpecificMarkdown);

        return repoBadgesMarkdown;
    }

    private GetRepoTypeSpecificMarkdown(repoMetaData: IRepoMetaData) {

        let repoTypeSpecificMarkdown: string[] = [];

        if (repoMetaData.isChromeExtension) {
            let chromeExtensionsBadgesMarkdown = this.GetChromeExtensionsBadgesMarkdown(repoMetaData.hostedRepoName);
            repoTypeSpecificMarkdown = repoTypeSpecificMarkdown.concat(chromeExtensionsBadgesMarkdown);
        }

        if (repoMetaData.isNugetPackage) {
            let nugetBadgesMarkdown = this.GetNugetBadgesMarkdown(repoMetaData.hostedRepoName);
            repoTypeSpecificMarkdown = repoTypeSpecificMarkdown.concat(nugetBadgesMarkdown);
        }

        if (repoMetaData.isSpecialRepo) {
            let specialReposBadgesMarkdown = this.GetSpecialReposBadgesMarkdown(repoMetaData.hostedRepoName);
            repoTypeSpecificMarkdown = repoTypeSpecificMarkdown.concat(specialReposBadgesMarkdown);
        }

        if (repoMetaData.isVstsExtension) {
            let vstsExtensionsBadgesMarkdown = this.GetVstsExtensionsBadgesMarkdown(repoMetaData.hostedRepoName);
            repoTypeSpecificMarkdown = repoTypeSpecificMarkdown.concat(vstsExtensionsBadgesMarkdown);
        }

        return repoTypeSpecificMarkdown;
    }

    private GetChromeExtensionsBadgesMarkdown(hostedRepoName: string) {
        return [
            this.mp.GetChromeWebstoreVersion(hostedRepoName),
            this.mp.GetChromeWebstoreUsers(hostedRepoName),
            this.mp.GetChromeWebstoreRating(hostedRepoName),
        ];
    }

    private GetNugetBadgesMarkdown(hostedRepoName: string) {
        return [
            this.mp.GetNugetDownloads(hostedRepoName),
        ];
    }

    private GetSharedBadgesMarkdown(hostedRepoName: string) {
        return [
            this.mp.GetLicenceBadgeMarkdown(),
            this.mp.GetAccessLintBadgeMarkdown(),
            this.mp.GetGitHubTopLanguage(hostedRepoName),
            this.mp.GetGitHubLanguageCount(hostedRepoName),
            this.mp.GetGitHubPullRequests(hostedRepoName),
            this.mp.GetBetterCodeHubCompliance(hostedRepoName),
            this.mp.GetCodacyBadge(hostedRepoName),
            this.mp.GetCodeCov(hostedRepoName),
            this.mp.GetCodeFactor(hostedRepoName),
            this.mp.GetAppveyorBuildStatus(hostedRepoName),
            this.mp.GetAppveyorUnitTests(hostedRepoName),
            this.mp.GetTravisBuildStatus(hostedRepoName),
            this.mp.GetImgBot(hostedRepoName),
            this.mp.GetCharityWare(hostedRepoName),
            this.mp.GetAccessLintSocial(hostedRepoName),
        ];
    }

    private GetSpecialReposBadgesMarkdown(hostedRepoName: string) {

        let badgesMarkdown = "";

        let allReposExceptSpecials = this.allRepoMeta.repoMetaDatas.filter(x => x.hostedRepoName != "BadgesPlayground");

        for (let repoMetaData of allReposExceptSpecials) {
            badgesMarkdown = badgesMarkdown + '\n' + "#### " + repoMetaData.hostedRepoName + this.GetBadgesMarkdown(repoMetaData);
        }

        return badgesMarkdown;
    }

    private GetVstsExtensionsBadgesMarkdown(hostedRepoName: string) {
        return [
            this.mp.GetVisualStudioMarketplaceVSTSDownloads(hostedRepoName),
            this.mp.GetVisualStudioMarketplaceVSTSRatings(hostedRepoName),
            this.mp.GetVisualStudioMarketplaceVSTSVersion(hostedRepoName),
        ];
    }
}
