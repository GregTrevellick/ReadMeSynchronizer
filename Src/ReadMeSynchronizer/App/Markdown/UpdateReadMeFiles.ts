import { FileSystemUpdater } from "./FileSystemUpdater";
import { IRepoMetaData } from "./IRepoMetaData";
import { MarkdownProvider } from "./MarkdownProvider";
import { RepoCategory } from "./RepoCategory";
import { RepoMetaDatas } from "./RepoMetaDatas";
import { allBadges } from "./Repos";
import { GroupedBadgeType } from "./GroupedBadgeType";
import { IVsmpMetaData } from "./IVsmpMetaData";
import { SonarCategory } from "./SonarCategory";
import { SonarMetaHelper } from "./SonarMetaHelper";

export class ReadMeUpdater {
    public replace = require("gulp-string-replace");
    public prefix: string = "Badges";
    public htmlCommentStart: string = "<!--" + this.prefix;
    public htmlCommentEnd: string = "-->";
    public badgeCommentStartSuffixBadgeMarkdown: string;
    public badgeCommentStartSuffix: string;
    public badgeCommentStart: string = this.htmlCommentStart + "START" + this.htmlCommentEnd;
    public badgeCommentEnd: string = this.htmlCommentStart + "END" + this.htmlCommentEnd;
    private allReposExceptTheAllBadgesRepo: IRepoMetaData[];
    private fileSystemUpdater: FileSystemUpdater;
    private lineBreak: string = "\n";
    private mp: MarkdownProvider;
    private repoMetaDatas: RepoMetaDatas;
    private sonarMetaHelper: SonarMetaHelper;
    private titleHtag = "##### ";

    constructor() {
        this.fileSystemUpdater = new FileSystemUpdater;
        this.mp = new MarkdownProvider;
        this.repoMetaDatas = new RepoMetaDatas;
        this.sonarMetaHelper = new SonarMetaHelper;
        this.allReposExceptTheAllBadgesRepo = this.repoMetaDatas.repoMetaDatas.filter(x => x.localRepoName != allBadges.localRepoName);
        this.badgeCommentStartSuffixBadgeMarkdown = this.mp.GetPoweredByReadMeSynchronizerBadgeMarkdown();
        this.badgeCommentStartSuffix = `${this.badgeCommentStartSuffixBadgeMarkdown}${this.lineBreak}<!-- Powered by https://github.com/GregTrevellick/ReadMeSynchronizer -->`;
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
            const badgesMarkdown = this.GetVsmpExtensionsBadgesMarkdown(repoMetaData);
            repoTypeSpecificMarkdown = repoTypeSpecificMarkdown.concat(badgesMarkdown);
        }

        if (repoMetaData.repoCategory === RepoCategory.VstsExtension) {
            const badgesMarkdown = this.GetVsmpExtensionsBadgesMarkdown(repoMetaData);
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

            //Sonar
            this.mp.GetSonarBadge(repoMetaData.localRepoName, this.sonarMetaHelper.GetSonarMetaData(SonarCategory.AlertStatus)),
            this.mp.GetSonarBadge(repoMetaData.localRepoName, this.sonarMetaHelper.GetSonarMetaData(SonarCategory.Bugs)),
            this.mp.GetSonarBadge(repoMetaData.localRepoName, this.sonarMetaHelper.GetSonarMetaData(SonarCategory.CodeSmells)),
            //this.mp.GetSonarCoverage(repoMetaData.localRepoName),
            //this.mp.GetSonarDuplicatedLinesDensity(repoMetaData.localRepoName),
            //this.mp.GetSonarNcloc(repoMetaData.localRepoName),
            //this.mp.GetSonarReliabilityRating(repoMetaData.localRepoName),
            //this.mp.GetSonarSecurityRating(repoMetaData.localRepoName),
            //this.mp.GetSonarSqaleIndex(repoMetaData.localRepoName),
            //this.mp.GetSonarSqaleRating(repoMetaData.localRepoName),
            //this.mp.GetSonarVulnerabilities(repoMetaData.localRepoName),

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
            this.mp.GetRenovateBotBadgeMarkdown(),
            this.mp.GetCharityWare(repoMetaData.localRepoName),
            this.mp.GetLicenceBadgeMarkdown(),
        ];
    }

    private GetVsmpExtensionsBadgesMarkdown(repoMetaData: IRepoMetaData) {
        let result: string[] = [""];
        const vsmpMetaData = repoMetaData as IVsmpMetaData;

        for (const vsmpItemName of vsmpMetaData.vsmpItemNames) {

            if (vsmpMetaData.repoCategory === RepoCategory.VsIdeExtension) {
                result.push(this.mp.GetVisualStudioMarketplaceIDEItemBadge(vsmpItemName));
                result.push(this.mp.GetVisualStudioMarketplaceIDEDownloads(vsmpItemName));
                result.push(this.mp.GetVisualStudioMarketplaceIDERatings(vsmpItemName));
                result.push(this.mp.GetVisualStudioMarketplaceIDEVersion(vsmpItemName));
            }

            if (vsmpMetaData.repoCategory === RepoCategory.VstsExtension) {
                const itemName = "vsts-extensions-tweets-" + vsmpItemName.replace("@", "");
                result.push(this.mp.GetVisualStudioMarketplaceVSTSItemBadge(vsmpItemName, itemName));
                result.push(this.mp.GetVisualStudioMarketplaceVSTSDownloads(vsmpItemName, itemName));
                result.push(this.mp.GetVisualStudioMarketplaceVSTSRatings(vsmpItemName, itemName));
                result.push(this.mp.GetVisualStudioMarketplaceVSTSVersion(vsmpItemName, itemName));
            }

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
        badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.SonarAlertStatus);
        badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.SonarBugs);
        badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.SonarCodeSmells);
        //badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.SonarCoverage);
        //badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.SonarDuplicatedLinesDensity);
        //badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.SonarNcloc);
        //badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.SonarReliabilityRating);
        //badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.SonarSecurityRating);
        //badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.SonarSqaleIndex);
        //badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.SonarSqaleRating);
        //badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.SonarVulnerabilities);

        return badgesByTypeMarkdown;
    }

    private GetGroupedBadgeTypeMarkdown(allReposExceptTheAllBadgesRepo: IRepoMetaData[], groupedBadgeType: GroupedBadgeType) {
        let badgesMarkdown = "";
        let title = "";

        for (const repoMetaData of allReposExceptTheAllBadgesRepo) {
            switch (groupedBadgeType)
            {
                case GroupedBadgeType.AppveyorBuildStatus: {
                    badgesMarkdown += `${this.lineBreak}${this.mp.GetAppveyorBuildStatus(repoMetaData.localRepoName, repoMetaData.appVeyorId)}`;
                    break;
                }
                case GroupedBadgeType.AppveyorUnitTests: {
                    badgesMarkdown += `${this.lineBreak}${this.mp.GetAppveyorUnitTests(repoMetaData.localRepoName)}`;
                    break;
                }
                case GroupedBadgeType.BetterCodeHubCompliance: {
                    badgesMarkdown += `${this.lineBreak}${this.mp.GetBetterCodeHubCompliance(repoMetaData.localRepoName)}`;
                    break;
                }
                case GroupedBadgeType.CodacyBadge: {
                    badgesMarkdown += `${this.lineBreak}${this.mp.GetCodacyBadge(repoMetaData.localRepoName, repoMetaData.codacyId)}`;
                    break;
                }
                case GroupedBadgeType.CodeFactor: {
                    badgesMarkdown += `${this.lineBreak}${this.mp.GetCodeFactor(repoMetaData.localRepoName)}`;
                    break;
                }
                case GroupedBadgeType.GitHubPullRequests: {
                    badgesMarkdown += `${this.lineBreak}${this.mp.GetGitHubPullRequests(repoMetaData.localRepoName)}`;
                    break;
                }
                case GroupedBadgeType.SonarAlertStatus: {
                    const sonarMetaData = this.sonarMetaHelper.GetSonarMetaData(SonarCategory.AlertStatus);
                    badgesMarkdown += `${this.lineBreak}${this.mp.GetSonarBadge(repoMetaData.localRepoName, sonarMetaData)}`;//gregt dedupe
                    break;
                }
                case GroupedBadgeType.SonarBugs: {
                    const sonarMetaData = this.sonarMetaHelper.GetSonarMetaData(SonarCategory.Bugs);
                    badgesMarkdown += `${this.lineBreak}${this.mp.GetSonarBadge(repoMetaData.localRepoName, sonarMetaData)}`;//gregt dedupe
                    break;
                }
                case GroupedBadgeType.SonarCodeSmells: {
                    const sonarMetaData = this.sonarMetaHelper.GetSonarMetaData(SonarCategory.CodeSmells);
                    badgesMarkdown += `${this.lineBreak}${this.mp.GetSonarBadge(repoMetaData.localRepoName, sonarMetaData)}`;//gregt dedupe
                    break;
                }

            }
        }

        title = this.GetTitle(groupedBadgeType);
        const titleAndBadges = this.GetTitleAndBadges(title, badgesMarkdown);
        return titleAndBadges;
    }

    private GetTitle(groupedBadgeType: GroupedBadgeType) {
        return `${this.titleHtag}${GroupedBadgeType[groupedBadgeType]}`;
    }

    private GetTitleAndBadges(title: string, markdown: string) {
        return `${title}${this.lineBreak}${markdown}${this.lineBreak}`;
    }
}
