import { AllRepoMeta } from "./AllRepoMeta";
import { FileSystemUpdater } from "./FileSystemUpdater";
import { IRepoMetaData } from "./IRepoMetaData";
import { MarkdownProvider } from "./MarkdownProvider";
import { RepoCategory } from "./RepoCategory";

export class ReadMeUpdater {
    private lineBreak: string = "\n";
    public replace = require("gulp-string-replace");
    public prefix: string = "Badges";
    public htmlCommentStart: string = "<!--" + this.prefix;
    public htmlCommentEnd: string = "-->";
    public badgeCommentStartSuffix: string = "<!-- Powered by https://github.com/GregTrevellick/Badges-playground -->";
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
        for (const repoMetaData of this.allRepoMeta.repoMetaDatas) {
            const badgesMarkdown = this.GetBadgesMarkdown(repoMetaData);
            this.fsu.ReplaceBadgeCommentOnDisc(repoMetaData.localRepoName, badgesMarkdown, this.badgeCommentStart, this.badgeCommentEnd);
        }
    }

    private GetBadgesMarkdown(repoMetaData: IRepoMetaData) {
        const multipleBadgesMarkdown = this.GetMultipleBadgesMarkdown(repoMetaData);
        return `${this.badgeCommentStart}${this.lineBreak}${this.badgeCommentStartSuffix}${this.lineBreak}${multipleBadgesMarkdown}${this.badgeCommentEnd}${this.lineBreak}`;
    }

    private GetMultipleBadgesMarkdown(repoMetaData: IRepoMetaData) {
        let badgesMarkdownFinal: string = "";

        const repoBadgesMarkdown = this.GetRepoBadgesMarkdown(repoMetaData);

        //combine all badges, with line breaks
        repoBadgesMarkdown.forEach(function(badgeMarkdown) {
            badgesMarkdownFinal += `${badgeMarkdown}
`;
        });

        return badgesMarkdownFinal;
    }

    private GetRepoBadgesMarkdown(repoMetaData: IRepoMetaData) {

        let repoBadgesMarkdown = this.GetSharedBadgesMarkdown(repoMetaData);

        const repoTypeSpecificMarkdown: string[] = this.GetRepoTypeSpecificMarkdown(repoMetaData);

        repoBadgesMarkdown = repoBadgesMarkdown.concat(repoTypeSpecificMarkdown);

        return repoBadgesMarkdown;
    }

    private GetRepoTypeSpecificMarkdown(repoMetaData: IRepoMetaData) {

        let repoTypeSpecificMarkdown: string[] = [];

        if (repoMetaData.repoCategory === RepoCategory.ChromeExtension) {
            const chromeExtensionsBadgesMarkdown = this.GetChromeExtensionsBadgesMarkdown(repoMetaData.hostedRepoName);
            repoTypeSpecificMarkdown = repoTypeSpecificMarkdown.concat(chromeExtensionsBadgesMarkdown);
        }

        if (repoMetaData.repoCategory === RepoCategory.NugetPackage) {
            const nugetBadgesMarkdown = this.GetNugetBadgesMarkdown(repoMetaData.hostedRepoName);
            repoTypeSpecificMarkdown = repoTypeSpecificMarkdown.concat(nugetBadgesMarkdown);
        }

        if (repoMetaData.repoCategory === RepoCategory.SpecialRepo) {
            const specialReposBadgesMarkdown = this.GetSpecialReposBadgesMarkdown(repoMetaData.hostedRepoName);
            repoTypeSpecificMarkdown = repoTypeSpecificMarkdown.concat(specialReposBadgesMarkdown);
        }

        if (repoMetaData.repoCategory === RepoCategory.VstsExtension) {
            const vstsExtensionsBadgesMarkdown = this.GetVstsExtensionsBadgesMarkdown(repoMetaData.hostedRepoName);
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

    private GetSharedBadgesMarkdown(repoMetaData: IRepoMetaData) {
        //Do not alpha sort these
        return [

            //code quality first
            this.mp.GetBetterCodeHubCompliance(repoMetaData.localRepoName),
            this.mp.GetCodacyBadge(repoMetaData.hostedRepoName, repoMetaData.codacyId),
            this.mp.GetCodeFactor(repoMetaData.localRepoName),

            //lang info
            this.mp.GetGitHubTopLanguage(repoMetaData.localRepoName),
            this.mp.GetGitHubLanguageCount(repoMetaData.localRepoName),

            //PRs
            this.mp.GetGitHubPullRequests(repoMetaData.localRepoName),

            //build / test coverage related
            //this.mp.GetCodeCov(repoMetaData.hostedRepoName),
            this.mp.GetAppveyorBuildStatus(repoMetaData.localRepoName),
            this.mp.GetAppveyorUnitTests(repoMetaData.hostedRepoName),
            //this.mp.GetTravisBuildStatus(repoMetaData.hostedRepoName),

            //less important stuff
            this.mp.GetAccessLintBadgeMarkdown(),
            this.mp.GetImgBot(repoMetaData.hostedRepoName),
            this.mp.GetCharityWare(repoMetaData.hostedRepoName),
            this.mp.GetLicenceBadgeMarkdown(),
        ];
    }

    private GetSpecialReposBadgesMarkdown(hostedRepoName: string) {

        let badgesMarkdown = "";

        const allReposExceptSpecials = this.allRepoMeta.repoMetaDatas.filter(x => x.hostedRepoName != "BadgesPlayground");

        for (const repoMetaData of allReposExceptSpecials) {
            const repoCategoryDescription = RepoCategory[repoMetaData.repoCategory];
            badgesMarkdown = badgesMarkdown + this.lineBreak + "#### " + repoCategoryDescription + " - " + repoMetaData.hostedRepoName + this.GetBadgesMarkdown(repoMetaData);
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
