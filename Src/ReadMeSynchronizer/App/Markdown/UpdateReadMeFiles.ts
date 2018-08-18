import { FileSystemUpdater } from "./FileSystemUpdater";
import { IRepoMetaData } from "./IRepoMetaData";
import { MarkdownProvider } from "./MarkdownProvider";
import { RepoCategory } from "./RepoCategory";
import { RepoMetaDatas } from "./RepoMetaDatas";
import { allBadges } from "./Repos";
import { GroupedBadgeType } from "./GroupedBadgeType";
import { IVsmpMetaData } from "./IVsmpMetaData";

export class ReadMeUpdater {
    public replace = require("gulp-string-replace");
    public prefix: string = "Badges";
    public htmlCommentStart: string = "<!--" + this.prefix;
    public htmlCommentEnd: string = "-->";
    public badgeCommentStartSuffix: string = "<!-- Powered by https://github.com/GregTrevellick/ReadMeSynchronizer -->";
    public badgeCommentStart: string = this.htmlCommentStart + "START" + this.htmlCommentEnd;
    public badgeCommentEnd: string = this.htmlCommentStart + "END" + this.htmlCommentEnd;
    private allReposExceptTheAllBadgesRepo: IRepoMetaData[];
    private fileSystemUpdater: FileSystemUpdater;
    private lineBreak: string = "\n";
    private mp: MarkdownProvider;
    private repoMetaDatas: RepoMetaDatas;
    private titleHtag = "##### ";

    constructor() {
        this.fileSystemUpdater = new FileSystemUpdater;
        this.mp = new MarkdownProvider;
        this.repoMetaDatas = new RepoMetaDatas;
        this.allReposExceptTheAllBadgesRepo = this.repoMetaDatas.repoMetaDatas.filter(x => x.localRepoName != allBadges.localRepoName);
    }

    public ReplaceBadgeComments() {
        for (const repoMetaData of this.repoMetaDatas.repoMetaDatas) {

            let baseBadgesMarkdown = "";

            if (repoMetaData.localRepoName === allBadges.localRepoName) {
                baseBadgesMarkdown += this.GetBadgesByType();
                baseBadgesMarkdown += `${this.lineBreak}### Per Repo${this.lineBreak}`;
                baseBadgesMarkdown += `${this.titleHtag}Parent - ${repoMetaData.localRepoName}`;//DEDUPE
            }

            baseBadgesMarkdown += `${this.lineBreak}${this.GetMultipleBadgesMarkdown(repoMetaData)}`;

            const surroundedBadgesMarkdown = this.GetSurroundedBadgesMarkdown(baseBadgesMarkdown);

            this.fileSystemUpdater.ReplaceBadgeCommentOnDisc(repoMetaData.localRepoName, surroundedBadgesMarkdown, this.badgeCommentStart, this.badgeCommentEnd);
        }
    }

    private GetSurroundedBadgesMarkdown(baseBadgesMarkdown: string) {
        return `${this.badgeCommentStart}${this.lineBreak}${this.badgeCommentStartSuffix}${this.lineBreak}${baseBadgesMarkdown}${this.badgeCommentEnd}`;
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

        //TODO convert to switch statement

        if (repoMetaData.repoCategory === RepoCategory.AllBadges) {
            const badgesMarkdown = this.GetAllBadgesRepoMarkdown(repoMetaData.localRepoName);
            repoTypeSpecificMarkdown = repoTypeSpecificMarkdown.concat(badgesMarkdown);
        }

        if (repoMetaData.repoCategory === RepoCategory.ChromeExtension) {
            const badgesMarkdown = this.GetChromeExtensionsBadgesMarkdown(repoMetaData.localRepoName);
            repoTypeSpecificMarkdown = repoTypeSpecificMarkdown.concat(badgesMarkdown);
        }

        if (repoMetaData.repoCategory === RepoCategory.NugetPackage) {
            const badgesMarkdown = this.GetNugetBadgesMarkdown(repoMetaData.localRepoName);
            repoTypeSpecificMarkdown = repoTypeSpecificMarkdown.concat(badgesMarkdown);
        }

        if (repoMetaData.repoCategory === RepoCategory.ReadMeSynchronizer) {
            //Do nothing for now, in future potentially get badges for Yeoman, VSide, etc
        }

        if (repoMetaData.repoCategory === RepoCategory.VsIdeExtension) {
            const vsmpMetaData = repoMetaData as IVsmpMetaData;//GREGT DEDUPE
            const badgesMarkdown = this.GetVsIdeExtensionsBadgesMarkdown(vsmpMetaData.vsmpItemNames);
            repoTypeSpecificMarkdown = repoTypeSpecificMarkdown.concat(badgesMarkdown);
        }

        if (repoMetaData.repoCategory === RepoCategory.VstsExtension) {
            const vsmpMetaData = repoMetaData as IVsmpMetaData;//GREGT DEDUPE
            const badgesMarkdown = this.GetVstsExtensionsBadgesMarkdown(vsmpMetaData.vsmpItemNames);
            repoTypeSpecificMarkdown = repoTypeSpecificMarkdown.concat(badgesMarkdown);
        }

        return repoTypeSpecificMarkdown;
    }

    private GetAllBadgesRepoMarkdown(localRepoName: string) {

        let badgesMarkdown = "";

        //Add badges for every repo, with a title containing category & repo name
        for (const repoMetaData of this.allReposExceptTheAllBadgesRepo) {
            const repoCategoryDescription = RepoCategory[repoMetaData.repoCategory];
            const markdown = this.GetMultipleBadgesMarkdown(repoMetaData);
            const title = `${this.titleHtag}${repoCategoryDescription} - ${repoMetaData.localRepoName}`;//DEDUPE
            badgesMarkdown += this.GetTitleAndBadges(title, markdown);
        }

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
            //TODO gregt
            //this.mp.GetCodeCov(repoMetaData.localRepoName),
            this.mp.GetAppveyorBuildStatus(repoMetaData.localRepoName, repoMetaData.appVeyorId),
            this.mp.GetAppveyorUnitTests(repoMetaData.localRepoName),
            //TODO gregt
            //this.mp.GetTravisBuildStatus(repoMetaData.localRepoName),

            //less important stuff
            this.mp.GetAccessLintBadgeMarkdown(),
            this.mp.GetImgBot(repoMetaData.localRepoName),
            this.mp.GetCharityWare(repoMetaData.localRepoName),
            this.mp.GetLicenceBadgeMarkdown(),
        ];
    }

    private GetVsIdeExtensionsBadgesMarkdown(vsmpItemNames: string[]) {//GREGT DEDUPE

        let result: string[] = [""];

        for (const vsmpItemName of vsmpItemNames) {
            //if (vsmpItemNames.length > 1) {
                result.push(`${this.mp.GetVisualStudioMarketplaceIDEItemBadge(vsmpItemName)}`);
            //}
            result.push(`${this.mp.GetVisualStudioMarketplaceIDEDownloads(vsmpItemName)}`);
            result.push(`${this.mp.GetVisualStudioMarketplaceIDERatings(vsmpItemName)}`);
            result.push(`${this.mp.GetVisualStudioMarketplaceIDEVersion(vsmpItemName)}`);
            result.push(this.lineBreak);
        }

        return result;
    }

    private GetVstsExtensionsBadgesMarkdown(vsmpItemNames: string[]) {//GREGT DEDUPE

        let result: string[] = [""];

        for (const vsmpItemName of vsmpItemNames) {
            const itemName = "vsts-extensions-tweets-" + vsmpItemName.replace("@","");

            //if (vsmpItemNames.length > 1) {
                result.push(`${this.mp.GetVisualStudioMarketplaceVSTSItemBadge(vsmpItemName, itemName)}`);
            //}
            result.push(`${this.mp.GetVisualStudioMarketplaceVSTSDownloads(vsmpItemName, itemName)}`);
            result.push(`${this.mp.GetVisualStudioMarketplaceVSTSRatings(vsmpItemName, itemName)}`);
            result.push(`${this.mp.GetVisualStudioMarketplaceVSTSVersion(vsmpItemName, itemName)}`);
            result.push(this.lineBreak);
        }

        return result;
    }

    private GetBadgesByType(): string {
        let badgesByTypeMarkdown = "";

        badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.AppveyorBuildStatus);
        badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.AppveyorUnitTests);
        badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.BetterCodeHubCompliance);
        badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.CodacyBadge);
        badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.CodeFactor);
        badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.GitHubPullRequests);

        return badgesByTypeMarkdown;
    }

    private GetGroupedBadgeTypeMarkdown(allReposExceptTheAllBadgesRepo: IRepoMetaData[], groupedBadgeType: GroupedBadgeType) {
        let badgesMarkdown = "";
        let title = "";

        for (const repoMetaData of allReposExceptTheAllBadgesRepo) {
            switch (groupedBadgeType)
            {
                case GroupedBadgeType.AppveyorBuildStatus: {
                    title = `${this.titleHtag}Appveyor Builds`;
                    badgesMarkdown += `${this.lineBreak}${this.mp.GetAppveyorBuildStatus(repoMetaData.localRepoName, repoMetaData.appVeyorId)}`;
                    break;
                }
                case GroupedBadgeType.AppveyorUnitTests: {
                    title = `${this.titleHtag}Appveyor Tests`;
                    badgesMarkdown += `${this.lineBreak}${this.mp.GetAppveyorUnitTests(repoMetaData.localRepoName)}`;
                    break;
                }
                case GroupedBadgeType.BetterCodeHubCompliance: {
                    title = `${this.titleHtag}Better Code`;
                    badgesMarkdown += `${this.lineBreak}${this.mp.GetBetterCodeHubCompliance(repoMetaData.localRepoName)}`;
                    break;
                }
                case GroupedBadgeType.CodacyBadge: {
                    title = `${this.titleHtag}Codacy`;
                    badgesMarkdown += `${this.lineBreak}${this.mp.GetCodacyBadge(repoMetaData.localRepoName, repoMetaData.codacyId)}`;
                    break;
                }
                case GroupedBadgeType.CodeFactor: {
                    title = `${this.titleHtag}CodeFactor`;
                    badgesMarkdown += `${this.lineBreak}${this.mp.GetCodeFactor(repoMetaData.localRepoName)}`;
                    break;
                }
                case GroupedBadgeType.GitHubPullRequests: {
                    title = `${this.titleHtag}Pull Requests`;
                    badgesMarkdown += `${this.lineBreak}${this.mp.GetGitHubPullRequests(repoMetaData.localRepoName)}`;
                    break;
                }
            }
        }

        const titleAndBadges = this.GetTitleAndBadges(title, badgesMarkdown);
        return titleAndBadges;
    }

    private GetTitleAndBadges(title: string, markdown: string) {
        return `${title}${this.lineBreak}${markdown}${this.lineBreak}`;
    }
}
