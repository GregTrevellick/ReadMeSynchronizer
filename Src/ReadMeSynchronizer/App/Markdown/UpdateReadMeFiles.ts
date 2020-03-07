import { FileSystemUpdater } from "./FileSystemUpdater";
import { GroupedBadgeType } from "./GroupedBadgeType";
import { IRepoMetaData } from "./IRepoMetaData";
import { IVsmpMetaData } from "./IVsmpMetaData";
import { MarkdownProvider } from "./MarkdownProvider";
import { RepoCategory } from "./RepoCategory";
import { RepoMetaDatas } from "./RepoMetaDatas";
import { allBadges } from "./Repos";
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
    private mp: MarkdownProvider;
    private repoMetaDatas: RepoMetaDatas;
    private sonarMetaHelper: SonarMetaHelper;
    private titleHtag = "##### ";

    constructor() {
        this.fileSystemUpdater = new FileSystemUpdater();
        this.mp = new MarkdownProvider();
        this.repoMetaDatas = new RepoMetaDatas();
        this.sonarMetaHelper = new SonarMetaHelper();
        this.allReposExceptTheAllBadgesRepo = this.repoMetaDatas.repoMetaDatas.filter(x => x.localRepoName !== allBadges.localRepoName);
        this.badgeCommentStartSuffixBadgeMarkdown = this.mp.GetPoweredByReadMeSynchronizerBadgeMarkdown();
        this.badgeCommentStartSuffix = `<!-- Powered by ${this.mp.gitHubReadMeSynchronizerUrl} -->${this.mp.lineBreak}${this.badgeCommentStartSuffixBadgeMarkdown}`;
    }

    public ReplaceBadgeComments() {
        for (const repoMetaData of this.repoMetaDatas.repoMetaDatas) {

            let baseBadgesMarkdown = "";

            if (repoMetaData.localRepoName === allBadges.localRepoName) {
                baseBadgesMarkdown += this.GetBadgesByType();
                baseBadgesMarkdown += `${this.mp.lineBreak}## Per Repo${this.mp.lineBreak}`;
                baseBadgesMarkdown += this.GetFullTitle("Parent", repoMetaData.localRepoName);
            }

            baseBadgesMarkdown += `${this.GetMultipleBadgesMarkdown(repoMetaData)}${this.mp.lineBreak}`;

            //gregt2 dedupe - this is allbadges i think
            //baseBadgesMarkdown = baseBadgesMarkdown.replace(`${this.mp.lineBreak}${this.mp.lineBreak}`, this.mp.lineBreak);
            //baseBadgesMarkdown = baseBadgesMarkdown.replace(`${this.mp.lineBreak}${this.mp.lineBreak}`, this.mp.lineBreak);
            //baseBadgesMarkdown = baseBadgesMarkdown.replace(`${this.mp.lineBreak}${this.mp.lineBreak}`, this.mp.lineBreak);
            //baseBadgesMarkdown = baseBadgesMarkdown.replace(`${this.mp.lineBreak}${this.mp.lineBreak}`, this.mp.lineBreak);

            const surroundedBadgesMarkdown = this.GetSurroundedBadgesMarkdown(baseBadgesMarkdown);

            this.fileSystemUpdater.ReplaceBadgeCommentOnDisc(repoMetaData.localRepoName, surroundedBadgesMarkdown, this.badgeCommentStart, this.badgeCommentEnd);
        }
    }

    private GetFullTitle(repoCategoryDescription: string, localRepoName: string) {
        //commented out - second bottom half of AllBadges repo readme file contains categorized repos
        //return `${this.titleHtag} [${repoCategoryDescription} - ${localRepoName}](https://github.com/${this.mp.myUserName}/${localRepoName})`;
        return `${this.titleHtag} [${localRepoName}](https://github.com/${this.mp.myUserName}/${localRepoName})`;
    }

    private GetSurroundedBadgesMarkdown(baseBadgesMarkdown: string) {
        return `${this.badgeCommentStart}${this.mp.lineBreak}${this.badgeCommentStartSuffix}${this.mp.lineBreak}${baseBadgesMarkdown}${this.badgeCommentEnd}`;
    }

    private GetMultipleBadgesMarkdown(repoMetaData: IRepoMetaData) {
        let badgesMarkdownFinal: string = "";

        const repoBadgesMarkdown = this.GetRepoBadgesMarkdown(repoMetaData);

        //combine all badges, with line breaks
        repoBadgesMarkdown.forEach(function(badgeMarkdown) {
            badgesMarkdownFinal += `${badgeMarkdown}
`;
        });

        //gregt2 this is defo just repo alone & "Per Repo" bottom half of allbagges, not allbadges top half (todo: put into a loop)
        badgesMarkdownFinal = badgesMarkdownFinal.replace(`${this.mp.lineBreak}${this.mp.lineBreak}`, this.mp.lineBreak);
        badgesMarkdownFinal = badgesMarkdownFinal.replace(`${this.mp.lineBreak}${this.mp.lineBreak}`, this.mp.lineBreak);
        badgesMarkdownFinal = badgesMarkdownFinal.replace(`${this.mp.lineBreak}${this.mp.lineBreak}`, this.mp.lineBreak);

        return badgesMarkdownFinal;
    }

    private GetRepoBadgesMarkdown(repoMetaData: IRepoMetaData) {

        let repoBadgesMarkdown = this.GetSharedBadgesMarkdown(repoMetaData);

        for (let repoBadgeMarkdown of repoBadgesMarkdown) {
            repoBadgeMarkdown = repoBadgeMarkdown.replace(`[Subscribe]`, `${this.mp.lineBreak}${this.mp.lineBreak}[Subscribe]`);
        }

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

        if (repoMetaData.repoCategory === RepoCategory.AzureDevOpsExtension ||
            repoMetaData.repoCategory === RepoCategory.VstsExtension) {
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

            //////////////////////////////////gregt2 
            //////////////////////////////////markdown = markdown.replace(`${this.mp.lineBreak}${this.mp.lineBreak}`, this.mp.lineBreak);
            //////////////////////////////////markdown = markdown.replace(`${this.mp.lineBreak}${this.mp.lineBreak}`, this.mp.lineBreak);
            //////////////////////////////////markdown = markdown.replace(`${this.mp.lineBreak}${this.mp.lineBreak}`, this.mp.lineBreak);
            //////////////////////////////////markdown = markdown.replace(`${this.mp.lineBreak}${this.mp.lineBreak}`, this.mp.lineBreak);
            //////////////////////////////////markdown = markdown.replace(`${this.mp.lineBreak}${this.mp.lineBreak}`, this.mp.lineBreak);

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
            this.mp.GetCodacy(repoMetaData.localRepoName, repoMetaData.codacyId),
            this.mp.GetCodeBeat(repoMetaData.localRepoName),
            this.mp.GetCodeFactor(repoMetaData.localRepoName),
            //this.mp.GetInspecodeRocroReport(repoMetaData.localRepoName, repoMetaData.inspecodeId),
            this.mp.GetLgtmAlert(repoMetaData.localRepoName),
            this.mp.GetLgtmCodeQuality(repoMetaData.localRepoName),

            //lang info
            this.mp.GetGitHubTopLanguage(repoMetaData.localRepoName),
            this.mp.GetGitHubLanguageCount(repoMetaData.localRepoName),

            //Issues & PRs
            this.mp.GetGitHubIssues(repoMetaData.localRepoName),
            this.mp.GetGitHubPullRequests(repoMetaData.localRepoName),

            //Sonar
            this.mp.GetSonarBadge(repoMetaData.localRepoName, this.sonarMetaHelper.GetSonarMetaData(SonarCategory.QualityGateStatus), repoMetaData.sonarCloudProjectPrefix),
            this.mp.GetSonarBadge(repoMetaData.localRepoName, this.sonarMetaHelper.GetSonarMetaData(SonarCategory.Bugs), repoMetaData.sonarCloudProjectPrefix),
            this.mp.GetSonarBadge(repoMetaData.localRepoName, this.sonarMetaHelper.GetSonarMetaData(SonarCategory.CodeSmells), repoMetaData.sonarCloudProjectPrefix),
            this.mp.GetSonarBadge(repoMetaData.localRepoName, this.sonarMetaHelper.GetSonarMetaData(SonarCategory.Coverage), repoMetaData.sonarCloudProjectPrefix),
            this.mp.GetSonarBadge(repoMetaData.localRepoName, this.sonarMetaHelper.GetSonarMetaData(SonarCategory.DuplicatedLinesDensity), repoMetaData.sonarCloudProjectPrefix),
            this.mp.GetSonarBadge(repoMetaData.localRepoName, this.sonarMetaHelper.GetSonarMetaData(SonarCategory.NumberOfLinesOfCode), repoMetaData.sonarCloudProjectPrefix),
            this.mp.GetSonarBadge(repoMetaData.localRepoName, this.sonarMetaHelper.GetSonarMetaData(SonarCategory.ReliabilityRating), repoMetaData.sonarCloudProjectPrefix),
            this.mp.GetSonarBadge(repoMetaData.localRepoName, this.sonarMetaHelper.GetSonarMetaData(SonarCategory.SecurityRating), repoMetaData.sonarCloudProjectPrefix),
            this.mp.GetSonarBadge(repoMetaData.localRepoName, this.sonarMetaHelper.GetSonarMetaData(SonarCategory.TechnicalDebt), repoMetaData.sonarCloudProjectPrefix),
            this.mp.GetSonarBadge(repoMetaData.localRepoName, this.sonarMetaHelper.GetSonarMetaData(SonarCategory.Maintainability), repoMetaData.sonarCloudProjectPrefix),
            this.mp.GetSonarBadge(repoMetaData.localRepoName, this.sonarMetaHelper.GetSonarMetaData(SonarCategory.Vulnerabilities), repoMetaData.sonarCloudProjectPrefix),

            //build / test coverage related
            this.mp.GetAppveyorBuildStatus(repoMetaData.localRepoName, repoMetaData.appVeyorId),
            this.mp.GetAppveyorUnitTests(repoMetaData.localRepoName, repoMetaData.appVeyorId),
            this.mp.GetAzurePipelineBuildStatus(repoMetaData.localRepoName, repoMetaData.azureDefinitionId),
            //this.mp.GetInspecodeRocroStatus(repoMetaData.localRepoName, repoMetaData.inspecodeId),

            //less important stuff
            this.mp.GetHound(repoMetaData.localRepoName),
            this.mp.GetAccessLintBadgeMarkdown(),
            this.mp.GetImgBot(repoMetaData.localRepoName),
            this.mp.GetRenovateBotBadgeMarkdown(),
            this.mp.GetCharityWare(repoMetaData.localRepoName),
            this.mp.GetLicenceBadgeMarkdown(),

            //subscribe link
            this.mp.GetSubscribeMarkdown(repoMetaData.localRepoName),
        ];
    }

    private GetVsmpExtensionsBadgesMarkdown(repoMetaData: IRepoMetaData) {
        const result: string[] = [""];
        const vsmpMetaData = repoMetaData as IVsmpMetaData;

        for (const vsmpItemName of vsmpMetaData.vsmpItemNames) {

            if (vsmpMetaData.repoCategory === RepoCategory.AzureDevOpsExtension) {
                result.push(this.mp.GetVisualStudioMarketplaceVSTSItemBadge(vsmpItemName, vsmpItemName));
                result.push(this.mp.GetVisualStudioMarketplaceVSTSDownloads(vsmpItemName, vsmpItemName));
                result.push(this.mp.GetVisualStudioMarketplaceVSTSRatings(vsmpItemName, vsmpItemName));
                result.push(this.mp.GetVisualStudioMarketplaceVSTSVersion(vsmpItemName, vsmpItemName));
            }

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

            result.push(this.mp.lineBreak);
        }

        return result;
    }

    private GetBadgesByType(): string {
        let badgesByTypeMarkdown = "";

        //SORT THESE ALPHA - THIS IS UI SEQUENCE
        badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.AppveyorBuildStatus);
        badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.AppveyorUnitTests);
        badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.AzurePipelineBuildStatus);
        badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.BetterCodeHubCompliance);
        badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.Codacy);
        badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.CodeBeat);
        badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.CodeFactor);
        badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.GitHubIssues);
        badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.GitHubPullRequests);
        //badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.InspecodeRocroReport);
        //badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.InspecodeRocroStatus);
        badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.LgtmAlert);
        badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.LgtmCodeQuality);
        badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.SonarBugs);
        badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.SonarCodeSmells);
        badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.SonarCoverage);
        badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.SonarDuplicatedLinesDensity);
        badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.SonarMaintainability);
        badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.SonarNumberOfLinesOfCode);
        badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.SonarQualityGateStatus);
        badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.SonarReliabilityRating);
        badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.SonarSecurityRating);
        badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.SonarTechnicalDebt);
        badgesByTypeMarkdown += this.GetGroupedBadgeTypeMarkdown(this.allReposExceptTheAllBadgesRepo, GroupedBadgeType.SonarVulnerabilities);

        return badgesByTypeMarkdown;
    }

    private GetGroupedBadgeTypeMarkdown(allReposExceptTheAllBadgesRepo: IRepoMetaData[], groupedBadgeType: GroupedBadgeType) {
        let badgesMarkdown = "";
        let repoMarkdown = "";
        let title = "";

        for (const repoMetaData of allReposExceptTheAllBadgesRepo) {
            switch (groupedBadgeType) {
                case GroupedBadgeType.AppveyorBuildStatus: {
                    repoMarkdown = this.mp.GetAppveyorBuildStatus(repoMetaData.localRepoName, repoMetaData.appVeyorId);
                    break;
                }
                case GroupedBadgeType.AppveyorUnitTests: {
                    repoMarkdown = this.mp.GetAppveyorUnitTests(repoMetaData.localRepoName, repoMetaData.appVeyorId);
                    break;
                }
                case GroupedBadgeType.AzurePipelineBuildStatus: {
                    repoMarkdown = this.mp.GetAzurePipelineBuildStatus(repoMetaData.localRepoName, repoMetaData.azureDefinitionId);
                    break;
                }
                case GroupedBadgeType.BetterCodeHubCompliance: {
                    repoMarkdown = this.mp.GetBetterCodeHubCompliance(repoMetaData.localRepoName);
                    break;
                }
                case GroupedBadgeType.Codacy: {
                    repoMarkdown = this.mp.GetCodacy(repoMetaData.localRepoName, repoMetaData.codacyId);
                    break;
                }
                case GroupedBadgeType.CodeBeat: {
                    repoMarkdown = this.mp.GetCodeBeat(repoMetaData.localRepoName, repoMetaData.codeBeatId);
                    break;
                }
                case GroupedBadgeType.CodeFactor: {
                    repoMarkdown = this.mp.GetCodeFactor(repoMetaData.localRepoName);
                    break;
                }
                case GroupedBadgeType.GitHubIssues: {
                    repoMarkdown = this.mp.GetGitHubIssues(repoMetaData.localRepoName);
                    break;
                }
                case GroupedBadgeType.GitHubPullRequests: {
                    repoMarkdown = this.mp.GetGitHubPullRequests(repoMetaData.localRepoName);
                    break;
                }
                //case GroupedBadgeType.InspecodeRocroReport: {
                //    repoMarkdown = this.mp.GetInspecodeRocroReport(repoMetaData.localRepoName, repoMetaData.inspecodeId);
                //    break;
                //}
                //case GroupedBadgeType.InspecodeRocroStatus: {
                //    repoMarkdown = this.mp.GetInspecodeRocroStatus(repoMetaData.localRepoName, repoMetaData.inspecodeId);
                //    break;
                //}
                case GroupedBadgeType.LgtmAlert: {
                    repoMarkdown = this.mp.GetLgtmAlert(repoMetaData.localRepoName);
                    break;
                }
                case GroupedBadgeType.LgtmCodeQuality: {
                    repoMarkdown = this.mp.GetLgtmCodeQuality(repoMetaData.localRepoName);
                    break;
                }
                case GroupedBadgeType.SonarBugs: {
                    repoMarkdown = this.GetSonarBadgesMarkdown(repoMetaData, SonarCategory.Bugs);
                    break;
                }
                case GroupedBadgeType.SonarCodeSmells: {
                    repoMarkdown = this.GetSonarBadgesMarkdown(repoMetaData, SonarCategory.CodeSmells);
                    break;
                }
                case GroupedBadgeType.SonarCoverage: {
                    repoMarkdown = this.GetSonarBadgesMarkdown(repoMetaData, SonarCategory.Coverage);
                    break;
                }
                case GroupedBadgeType.SonarDuplicatedLinesDensity: {
                    repoMarkdown = this.GetSonarBadgesMarkdown(repoMetaData, SonarCategory.DuplicatedLinesDensity);
                    break;
                }
                case GroupedBadgeType.SonarMaintainability: {
                    repoMarkdown = this.GetSonarBadgesMarkdown(repoMetaData, SonarCategory.Maintainability);
                    break;
                }
                case GroupedBadgeType.SonarNumberOfLinesOfCode: {
                    repoMarkdown = this.GetSonarBadgesMarkdown(repoMetaData, SonarCategory.NumberOfLinesOfCode);
                    break;
                }
                case GroupedBadgeType.SonarQualityGateStatus: {
                    repoMarkdown = this.GetSonarBadgesMarkdown(repoMetaData, SonarCategory.QualityGateStatus);
                    break;
                }
                case GroupedBadgeType.SonarReliabilityRating: {
                    repoMarkdown = this.GetSonarBadgesMarkdown(repoMetaData, SonarCategory.ReliabilityRating);
                    break;
                }
                case GroupedBadgeType.SonarSecurityRating: {
                    repoMarkdown = this.GetSonarBadgesMarkdown(repoMetaData, SonarCategory.SecurityRating);
                    break;
                }
                case GroupedBadgeType.SonarTechnicalDebt: {
                    repoMarkdown = this.GetSonarBadgesMarkdown(repoMetaData, SonarCategory.TechnicalDebt);
                    break;
                }
                case GroupedBadgeType.SonarVulnerabilities: {
                    repoMarkdown = this.GetSonarBadgesMarkdown(repoMetaData, SonarCategory.Vulnerabilities);
                    break;
                }

            }

            if (repoMarkdown !== this.mp.noMarkdown) {
                badgesMarkdown += `${this.mp.lineBreak}${repoMarkdown}`;
            }

        }

        title = this.GetTitle(groupedBadgeType);
        const titleAndBadges = this.GetTitleAndBadges(title, badgesMarkdown);
        return titleAndBadges;
    }

    private GetSonarBadgesMarkdown(repoMetaData: IRepoMetaData, sonarCategory: SonarCategory) {
        const sonarMetaData = this.sonarMetaHelper.GetSonarMetaData(sonarCategory);
        //return `${this.mp.lineBreak}${this.mp.GetSonarBadge(repoMetaData.localRepoName, sonarMetaData)}`;
        return `${this.mp.GetSonarBadge(repoMetaData.localRepoName, sonarMetaData, repoMetaData.sonarCloudProjectPrefix)}`;
    }

    private GetTitle(groupedBadgeType: GroupedBadgeType) {
        return `${this.titleHtag}${GroupedBadgeType[groupedBadgeType]}`;
    }

    private GetTitleAndBadges(title: string, markdown: string) {

        // Without expand/collapse...
        //return `${title}${this.mp.lineBreak}${markdown}${this.mp.lineBreak}`;

        // With expand/collapse...
        return `
${title}
<details open>
<summary>
expand/collapse
</summary>
${this.mp.lineBreak}${markdown}${this.mp.lineBreak}
</details>
${this.mp.lineBreak}`;

    }
}
