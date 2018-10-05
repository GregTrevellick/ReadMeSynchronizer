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
        this.badgeCommentStartSuffix = `${this.badgeCommentStartSuffixBadgeMarkdown}${this.lineBreak}<!-- Powered by ${this.mp.gitHubReadMeSynchronizerUrl} -->`;
    }

    public ReplaceBadgeComments() {
        for (const repoMetaData of this.repoMetaDatas.repoMetaDatas) {

            let baseBadgesMarkdown = "";

            if (repoMetaData.localRepoName === allBadges.localRepoName) {
                baseBadgesMarkdown += this.GetBadgesByType();
                baseBadgesMarkdown += `${this.lineBreak}## Per Repo${this.lineBreak}`;
                baseBadgesMarkdown += this.GetFullTitle("Parent", repoMetaData.localRepoName);
            }

            baseBadgesMarkdown += `${this.lineBreak}${this.GetMultipleBadgesMarkdown(repoMetaData)}`;

            const surroundedBadgesMarkdown = this.GetSurroundedBadgesMarkdown(baseBadgesMarkdown);

            this.fileSystemUpdater.ReplaceBadgeCommentOnDisc(repoMetaData.localRepoName, surroundedBadgesMarkdown, this.badgeCommentStart, this.badgeCommentEnd);
        }
    }

    private GetFullTitle(repoCategoryDescription: string, localRepoName: string) {

        // Without expand/collapse...
        return `${this.titleHtag} [${repoCategoryDescription} - ${localRepoName}](https://github.com/${this.mp.myUserName}/${localRepoName})`;

//////        // With expand/collapse...
//////        return `
//////<details>
//////<summary>
//////Click to expand or collapse
//////</summary>
//////${markdown}${this.lineBreak}
//////</details>
//////${this.lineBreak}`;
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
            const title = this.GetFullTitle(repoCategoryDescription, repoMetaData.localRepoName);
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
        return [
            //DO NOT ALPHA SORT THESE - THIS IS UI SEQUENCE (rubbish I know!)

            //code quality first
            this.mp.GetBetterCodeHubCompliance(repoMetaData.localRepoName),
            this.mp.GetCodacyBadge(repoMetaData.localRepoName, repoMetaData.codacyId),
            this.mp.GetCodeFactor(repoMetaData.localRepoName),

            //lang info
            this.mp.GetGitHubTopLanguage(repoMetaData.localRepoName),
            this.mp.GetGitHubLanguageCount(repoMetaData.localRepoName),

            //Issues & PRs
            this.mp.GetGitHubIssues(repoMetaData.localRepoName),
            this.mp.GetGitHubPullRequests(repoMetaData.localRepoName),

            //Sonar
            this.mp.GetSonarBadge(repoMetaData.localRepoName, this.sonarMetaHelper.GetSonarMetaData(SonarCategory.QualityGateStatus)),
            this.mp.GetSonarBadge(repoMetaData.localRepoName, this.sonarMetaHelper.GetSonarMetaData(SonarCategory.Bugs)),
            this.mp.GetSonarBadge(repoMetaData.localRepoName, this.sonarMetaHelper.GetSonarMetaData(SonarCategory.CodeSmells)),
            this.mp.GetSonarBadge(repoMetaData.localRepoName, this.sonarMetaHelper.GetSonarMetaData(SonarCategory.Coverage)),
            this.mp.GetSonarBadge(repoMetaData.localRepoName, this.sonarMetaHelper.GetSonarMetaData(SonarCategory.DuplicatedLinesDensity)),
            this.mp.GetSonarBadge(repoMetaData.localRepoName, this.sonarMetaHelper.GetSonarMetaData(SonarCategory.NumberOfLinesOfCode)),
            this.mp.GetSonarBadge(repoMetaData.localRepoName, this.sonarMetaHelper.GetSonarMetaData(SonarCategory.ReliabilityRating)),
            this.mp.GetSonarBadge(repoMetaData.localRepoName, this.sonarMetaHelper.GetSonarMetaData(SonarCategory.SecurityRating)),
            this.mp.GetSonarBadge(repoMetaData.localRepoName, this.sonarMetaHelper.GetSonarMetaData(SonarCategory.TechnicalDebt)),
            this.mp.GetSonarBadge(repoMetaData.localRepoName, this.sonarMetaHelper.GetSonarMetaData(SonarCategory.Maintainability)),
            this.mp.GetSonarBadge(repoMetaData.localRepoName, this.sonarMetaHelper.GetSonarMetaData(SonarCategory.Vulnerabilities)),

            //build / test coverage related
            this.mp.GetAppveyorBuildStatus(repoMetaData.localRepoName, repoMetaData.appVeyorId),
            this.mp.GetAppveyorUnitTests(repoMetaData.localRepoName),

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

        //DO NOT ALPHA SORT THESE - THIS IS UI SEQUENCE (rubbish I know!)
        badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.AppveyorBuildStatus);
        badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.AppveyorUnitTests);
        badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.BetterCodeHubCompliance);
        badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.CodacyBadge);
        badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.CodeFactor);
        badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.GitHubIssues);
        badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.GitHubPullRequests);
        badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.SonarQualityGateStatus);
        badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.SonarBugs);
        badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.SonarCodeSmells);
        badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.SonarCoverage);
        badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.SonarDuplicatedLinesDensity);
        badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.SonarNumberOfLinesOfCode);
        badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.SonarReliabilityRating);
        badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.SonarSecurityRating);
        badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.SonarTechnicalDebt);
        badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.SonarMaintainability);
        badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.SonarVulnerabilities);

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
                case GroupedBadgeType.GitHubIssues: {
                    badgesMarkdown += `${this.lineBreak}${this.mp.GetGitHubIssues(repoMetaData.localRepoName)}`;
                    break;
                }
                case GroupedBadgeType.GitHubPullRequests: {
                    badgesMarkdown += `${this.lineBreak}${this.mp.GetGitHubPullRequests(repoMetaData.localRepoName)}`;
                    break;
                }
                case GroupedBadgeType.SonarBugs: {
                    badgesMarkdown += this.GetSonarBadgesMarkdown(repoMetaData, SonarCategory.Bugs);
                    break;
                }
                case GroupedBadgeType.SonarCodeSmells: {
                    badgesMarkdown += this.GetSonarBadgesMarkdown(repoMetaData, SonarCategory.CodeSmells);
                    break;
                }
                case GroupedBadgeType.SonarCoverage: {
                    badgesMarkdown += this.GetSonarBadgesMarkdown(repoMetaData, SonarCategory.Coverage);
                    break;
                }
                case GroupedBadgeType.SonarDuplicatedLinesDensity: {
                    badgesMarkdown += this.GetSonarBadgesMarkdown(repoMetaData, SonarCategory.DuplicatedLinesDensity);
                    break;
                }
                case GroupedBadgeType.SonarMaintainability: {
                    badgesMarkdown += this.GetSonarBadgesMarkdown(repoMetaData, SonarCategory.Maintainability);
                    break;
                }
                case GroupedBadgeType.SonarNumberOfLinesOfCode: {
                    badgesMarkdown += this.GetSonarBadgesMarkdown(repoMetaData, SonarCategory.NumberOfLinesOfCode);
                    break;
                }
                case GroupedBadgeType.SonarQualityGateStatus: {
                    badgesMarkdown += this.GetSonarBadgesMarkdown(repoMetaData, SonarCategory.QualityGateStatus);
                    break;
                }
                case GroupedBadgeType.SonarReliabilityRating: {
                    badgesMarkdown += this.GetSonarBadgesMarkdown(repoMetaData, SonarCategory.ReliabilityRating);
                    break;
                }
                case GroupedBadgeType.SonarSecurityRating: {
                    badgesMarkdown += this.GetSonarBadgesMarkdown(repoMetaData, SonarCategory.SecurityRating);
                    break;
                }
                case GroupedBadgeType.SonarTechnicalDebt: {
                    badgesMarkdown += this.GetSonarBadgesMarkdown(repoMetaData, SonarCategory.TechnicalDebt);
                    break;
                }
                case GroupedBadgeType.SonarVulnerabilities: {
                    badgesMarkdown += this.GetSonarBadgesMarkdown(repoMetaData, SonarCategory.Vulnerabilities);
                    break;
                }

            }
        }

        title = this.GetTitle(groupedBadgeType);
        const titleAndBadges = this.GetTitleAndBadges(title, badgesMarkdown);
        return titleAndBadges;
    }

    private GetSonarBadgesMarkdown(repoMetaData: IRepoMetaData, sonarCategory: SonarCategory) {
        const sonarMetaData = this.sonarMetaHelper.GetSonarMetaData(sonarCategory);
        return `${this.lineBreak}${this.mp.GetSonarBadge(repoMetaData.localRepoName, sonarMetaData)}`;
    }

    private GetTitle(groupedBadgeType: GroupedBadgeType) {
        return `${this.titleHtag}${GroupedBadgeType[groupedBadgeType]}`;
    }

    private GetTitleAndBadges(title: string, markdown: string) {

        // Without expand/collapse...
        //return `${title}${this.lineBreak}${markdown}${this.lineBreak}`;

        // With expand/collapse...
        return `
${title}
<details>
<summary>
Click to expand or collapse
</summary>
${this.lineBreak}${markdown}${this.lineBreak}
</details>
${this.lineBreak}`;

    }
}
