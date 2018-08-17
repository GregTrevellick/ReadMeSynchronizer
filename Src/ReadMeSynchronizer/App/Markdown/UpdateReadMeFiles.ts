import { FileSystemUpdater } from "./FileSystemUpdater";
import { IRepoMetaData } from "./IRepoMetaData";
import { MarkdownProvider } from "./MarkdownProvider";
import { RepoCategory } from "./RepoCategory";
import { RepoMetaDatas } from "./RepoMetaDatas";
import { allBadges } from "./Repos";

export class ReadMeUpdater {
    public replace = require("gulp-string-replace");
    public prefix: string = "Badges";
    public htmlCommentStart: string = "<!--" + this.prefix;
    public htmlCommentEnd: string = "-->";
    public badgeCommentStartSuffix: string = "<!-- Powered by https://github.com/GregTrevellick/ReadMeSynchronizer -->";
    public badgeCommentStart: string = this.htmlCommentStart + "START" + this.htmlCommentEnd;
    public badgeCommentEnd: string = this.htmlCommentStart + "END" + this.htmlCommentEnd;
    private lineBreak: string = "\n";
    private fsu: FileSystemUpdater;
    private mp: MarkdownProvider;
    private repoMetaDatas: RepoMetaDatas;

    constructor() {
        this.fsu = new FileSystemUpdater;
        this.mp = new MarkdownProvider;
        this.repoMetaDatas = new RepoMetaDatas;
    }

    public ReplaceBadgeComments() {
        for (const repoMetaData of this.repoMetaDatas.repoMetaDatas) {
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

        if (repoMetaData.repoCategory === RepoCategory.AllBadges) {
            const allBadgesMarkdown = this.GetAllBadgesRepoMarkdown(repoMetaData.localRepoName);
            repoTypeSpecificMarkdown = repoTypeSpecificMarkdown.concat(allBadgesMarkdown);
        }

        if (repoMetaData.repoCategory === RepoCategory.ChromeExtension) {
            const chromeExtensionsBadgesMarkdown = this.GetChromeExtensionsBadgesMarkdown(repoMetaData.localRepoName);
            repoTypeSpecificMarkdown = repoTypeSpecificMarkdown.concat(chromeExtensionsBadgesMarkdown);
        }

        if (repoMetaData.repoCategory === RepoCategory.NugetPackage) {
            const nugetBadgesMarkdown = this.GetNugetBadgesMarkdown(repoMetaData.localRepoName);
            repoTypeSpecificMarkdown = repoTypeSpecificMarkdown.concat(nugetBadgesMarkdown);
        }

        if (repoMetaData.repoCategory === RepoCategory.ReadMeSynchronizer) {
            //Do nothing for now, in future potentially get badges for Yeoman, VSide, etc
        }

        if (repoMetaData.repoCategory === RepoCategory.VsIdeExtension) {
            const badgesMarkdown = this.GetVsIdeExtensionsBadgesMarkdown(repoMetaData.localRepoName);
            repoTypeSpecificMarkdown = repoTypeSpecificMarkdown.concat(badgesMarkdown);
        }

        if (repoMetaData.repoCategory === RepoCategory.VstsExtension) {
            const vstsExtensionsBadgesMarkdown = this.GetVstsExtensionsBadgesMarkdown(repoMetaData.localRepoName);
            repoTypeSpecificMarkdown = repoTypeSpecificMarkdown.concat(vstsExtensionsBadgesMarkdown);
        }

        return repoTypeSpecificMarkdown;
    }

    private GetAllBadgesRepoMarkdown(localRepoName: string) {

        //TODO avoid repeatedly looping through allReposExceptTheAllBadgesRepo below

        let badgesMarkdown = "";

        const allReposExceptTheAllBadgesRepo = this.repoMetaDatas.repoMetaDatas.filter(x => x.localRepoName != allBadges.localRepoName);
        const titleHtag = "#### ";

        //Add badges for every repo, with a title containing category & repo name
        for (const repoMetaData of allReposExceptTheAllBadgesRepo) {
            const repoCategoryDescription = RepoCategory[repoMetaData.repoCategory];
            //badgesMarkdown = badgesMarkdown + this.lineBreak + "#### " + repoCategoryDescription + " - " + repoMetaData.localRepoName + this.GetBadgesMarkdown(repoMetaData);
            const markdown = this.GetBadgesMarkdown(repoMetaData);
            const title = `${titleHtag}${repoCategoryDescription} - ${repoMetaData.localRepoName}`;
            badgesMarkdown = this.GetTitleAndBadges(badgesMarkdown, title, markdown);
        }

        //Add all build badges for every repo
        for (const repoMetaData of allReposExceptTheAllBadgesRepo) {
            const markdown = "builds" + repoMetaData.localRepoName;//this.GetAllBuildsMarkdown(repoMetaData);
            const title = `${titleHtag}Builds`;
            badgesMarkdown = this.GetTitleAndBadges(badgesMarkdown, title, markdown);
        }

        //Add all PR badges for every repo
        for (const repoMetaData of allReposExceptTheAllBadgesRepo) {
            const markdown = "PRs" + repoMetaData.localRepoName;//this.GetAllPullRequestsMarkdown(repoMetaData);
            const title = `${titleHtag}PRs`;
            badgesMarkdown = this.GetTitleAndBadges(badgesMarkdown, title, markdown);
        }

        return badgesMarkdown;
    }

    private GetTitleAndBadges(badgesMarkdown: string, title: string, markdown: string) {
        badgesMarkdown = `${badgesMarkdown}${this.lineBreak}${title}${markdown}`;
        return badgesMarkdown;
    }

    private GetChromeExtensionsBadgesMarkdown(localRepoName: string) {
        return [
            this.mp.GetChromeWebstoreVersion(localRepoName),
            this.mp.GetChromeWebstoreUsers(localRepoName),
            this.mp.GetChromeWebstoreRating(localRepoName),
        ];
    }

    private GetNugetBadgesMarkdown(localRepoName: string) {
        return [
            this.mp.GetNugetDownloads(localRepoName),
        ];
    }

    private GetSharedBadgesMarkdown(repoMetaData: IRepoMetaData) {
        //Do not alpha sort these
        return [

            //code quality first
            this.mp.GetBetterCodeHubCompliance(repoMetaData.localRepoName),
            this.mp.GetCodacyBadge(repoMetaData.localRepoName, repoMetaData.codacyId),
            this.mp.GetCodeFactor(repoMetaData.localRepoName),

            //lang info
            this.mp.GetGitHubTopLanguage(repoMetaData.localRepoName),
            this.mp.GetGitHubLanguageCount(repoMetaData.localRepoName),

            //PRs
            this.mp.GetGitHubPullRequests(repoMetaData.localRepoName),

            //build / test coverage related
            //this.mp.GetCodeCov(repoMetaData.localRepoName),
            this.mp.GetAppveyorBuildStatus(repoMetaData.localRepoName),
            this.mp.GetAppveyorUnitTests(repoMetaData.localRepoName),
            //this.mp.GetTravisBuildStatus(repoMetaData.localRepoName),

            //less important stuff
            this.mp.GetAccessLintBadgeMarkdown(),
            this.mp.GetImgBot(repoMetaData.localRepoName),
            this.mp.GetCharityWare(repoMetaData.localRepoName),
            this.mp.GetLicenceBadgeMarkdown(),
        ];
    }

    private GetVsIdeExtensionsBadgesMarkdown(localRepoName: string) {
        return [
            this.mp.GetVisualStudioMarketplaceIDEDownloads(localRepoName),
            this.mp.GetVisualStudioMarketplaceIDERatings(localRepoName),
            this.mp.GetVisualStudioMarketplaceIDEVersion(localRepoName),
        ];
    }

    private GetVstsExtensionsBadgesMarkdown(localRepoName: string) {
        return [
            this.mp.GetVisualStudioMarketplaceVSTSDownloads(localRepoName),
            this.mp.GetVisualStudioMarketplaceVSTSRatings(localRepoName),
            this.mp.GetVisualStudioMarketplaceVSTSVersion(localRepoName),
        ];
    }
}
