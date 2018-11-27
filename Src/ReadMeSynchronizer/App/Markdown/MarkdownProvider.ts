import { BadgeExclusions } from "./BadgeExclusions";
import { RepoNames } from "./RepoNames";
import { SonarMetaData } from "./SonarMetaData";

const chromeWebStore = "chrome-web-store";
const shieldsDotIoUrl = "https://img.shields.io/";
const sonarBadgesUrlAddress = "https://sonarcloud.io/api/project_badges/measure?project=";
const visualStudioMarketplaceUrl = "https://marketplace.visualstudio.com/items?itemName=";
const vsmarketplacebadgeAppHarborUrl = "https://vsmarketplacebadge.apphb.com/";
const vsmmWebstoreId = "fifncokofckhanlhmdacdnkbempmopbo";
const vsmmWebstoreUrl = "https://chrome.google.com/webstore/detail/visual-studio-marketplace/" + vsmmWebstoreId;

export class MarkdownProvider {
    public lineBreak: string = "\n";
    public myUserName = "GregTrevellick";
    public gitHubReadMeSynchronizerUrl = `https://github.com/${this.myUserName}/ReadMeSynchronizer`;
    public noMarkdown: string = "";

    private badgeExclusions: BadgeExclusions;

    constructor() {
        this.badgeExclusions = new BadgeExclusions();
    }

    //TODO convert all methods below to call a common method that returns the md, passing description + badge URL + hyperlink URL & returns square braces & curved brackets

    public GetAccessLintBadgeMarkdown() {
        return "[![Access Lint github](" + shieldsDotIoUrl + "badge/a11y-checked-brightgreen.svg)]" +
            "(https://www.accesslint.com)";
    }

    public GetAppveyorBuildStatus(localRepoName: string, appVeyorId: string) {
        if (this.ShowAppveyorBadges(localRepoName)) {
            const appVeyorRepoName = this.DotSubstituion(localRepoName);
            return "[![Appveyor Build status](https://ci.appveyor.com/api/projects/status/" + appVeyorId + "?svg=true)]" +
                "(https://ci.appveyor.com/project/" + this.myUserName + "/" + appVeyorRepoName + ")";
        }
        return this.noMarkdown;
    }

    public GetAppveyorUnitTests(localRepoName: string, appVeyorId: string) {
        if (this.ShowAppveyorBadges(localRepoName)) {
            const appVeyorRepoName = this.DotSubstituion(localRepoName);
            return "[![Appveyor unit tests](" + shieldsDotIoUrl + "appveyor/tests/" + this.myUserName + "/" + appVeyorRepoName + ".svg)]" +
                "(https://ci.appveyor.com/project/" + this.myUserName + "/" + appVeyorRepoName + "/build/tests)";
        }
        return this.noMarkdown;
    }

    public GetAzurePipelineBuildStatus(localRepoName: string, azureDefinitionId: string) {
        if (this.ShowAzurePipelineBadges(localRepoName)) {
            return "[![Azure Build Status](https://gregtrevellick.visualstudio.com/" + localRepoName + "/_apis/build/status/" + localRepoName + ")]" +
                "(https://gregtrevellick.visualstudio.com/" + localRepoName + "/_build/latest?definitionId=" + azureDefinitionId + ")";
        }
        return this.noMarkdown;
    }

    public GetBetterCodeHubCompliance(localRepoName: string) {
        if (this.ShowBetterCodeHubBadges(localRepoName)) {
            return "[![BetterCodeHub compliance](https://bettercodehub.com/edge/badge/" + this.myUserName + "/" + localRepoName + "?branch=master)]" +
                "(https://bettercodehub.com/results/" + this.myUserName + "/" + localRepoName + ")";
        }
        return this.noMarkdown;
    }

    public GetCharityWare(localRepoName: string) {
        return "[![Charity Ware](" + shieldsDotIoUrl + "badge/charity%20ware-thank%20you-brightgreen.svg)]" +
            "(https://github.com/" + this.myUserName + "/MiscellaneousArtefacts/wiki/Charity-Ware)";
    }

    public GetChromeWebstoreRating(localRepoName: string) {
        return "[![Chrome webstore rating](" + shieldsDotIoUrl + chromeWebStore + "/rating/" + vsmmWebstoreId + ".svg)]" +
            "(" + vsmmWebstoreUrl + "/reviews)";
    }

    public GetChromeWebstoreUsers(localRepoName: string) {
        return "[![Chrome webstore users](" + shieldsDotIoUrl + chromeWebStore + "/users/" + vsmmWebstoreId + ".svg)]" +
            "(" + vsmmWebstoreUrl + ")";
    }

    public GetChromeWebstoreVersion(localRepoName: string) {
        return "[![Chrome webstore version](" + shieldsDotIoUrl + chromeWebStore + "/v/" + vsmmWebstoreId + ".svg)]" +
            "(" + vsmmWebstoreUrl + ")";
    }

    public GetCodacy(localRepoName: string, codacyId: string) {
        if (this.ShowCodacyBadges(localRepoName)) {
            return "[![Codacy Badge](https://api.codacy.com/project/badge/Grade/" + codacyId + ")]" +
                "(https://www.codacy.com/project/gtrevellick/" + localRepoName + "/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=" + this.myUserName + "/" + localRepoName + "&amp;utm_campaign=Badge_Grade_Dashboard)";
        }
        return this.noMarkdown;
    }

    public GetCodeBeat(localRepoName: string, codeBeatId?: string) {
        if (this.ShowCodeBeatBadges(localRepoName)) {
            return "[![CodeBeat](https://codebeat.co/badges/" + codeBeatId + ")]" +
                "(https://codebeat.co/projects/github-com-" + this.myUserName.toLowerCase() + "-" + localRepoName.toLowerCase() + "-master)";
        }
        return this.noMarkdown;
    }

    public GetCodeFactor(localRepoName: string) {
        if (this.ShowCodeFactorBadges(localRepoName)) {
            return "[![CodeFactor](https://www.codefactor.io/repository/github/" + this.myUserName + "/" + localRepoName + "/badge)]" +
                "(https://www.codefactor.io/repository/github/" + this.myUserName + "/" + localRepoName + ")";
        }
        return this.noMarkdown;
    }

    public GetGitHubLanguageCount(localRepoName: string) {
        if (this.ShowGitHubBadges(localRepoName)) {
            return "[![Github language count](" + shieldsDotIoUrl + "github/languages/count/" + this.myUserName + "/" + localRepoName + ".svg)]" +
                "(" + this.GetGitHubUrlForRepo(localRepoName) + ")";
        }
        return this.noMarkdown;
    }

    public GetGitHubIssues(localRepoName: string) {
        if (this.ShowGitHubBadges(localRepoName)) {
            return "[![GitHub issues](" + shieldsDotIoUrl + "github/issues-raw/" + this.myUserName + "/" + localRepoName + ".svg)]" +
                "(" + this.GetGitHubUrlForRepo(localRepoName) + "/issues)";
        }
        return this.noMarkdown;
    }

    public GetGitHubPullRequests(localRepoName: string) {
        if (this.ShowGitHubBadges(localRepoName)) {
            return "[![GitHub pull requests](" + shieldsDotIoUrl + "github/issues-pr-raw/" + this.myUserName + "/" + localRepoName + ".svg)]" +
                "(" + this.GetGitHubUrlForRepo(localRepoName) + "/pulls)";
        }
        return this.noMarkdown;
    }

    public GetGitHubTopLanguage(localRepoName: string) {
        if (this.ShowGitHubBadges(localRepoName)) {
            return "[![GitHub top language](" + shieldsDotIoUrl + "github/languages/top/" + this.myUserName + "/" + localRepoName + ".svg)]" +
                "(" + this.GetGitHubUrlForRepo(localRepoName) + ")";
        }
        return this.noMarkdown;
    }

    public GetHound(localRepoName: string) {
        return "[![Hound](" + shieldsDotIoUrl + "badge/hound_ci-checked-brightgreen.svg)]" +
            "(https://houndci.com/)";
    }

    public GetImgBot(localRepoName: string) {
        return "[![ImgBot](" + shieldsDotIoUrl + "badge/images-optimized-brightgreen.svg)]" +
            "(https://imgbot.net/)";
    }

    public GetInspecodeRocroReport(localRepoName: string, inspecodeId: string) {
        if (this.ShowInspecodeRocroBadges(localRepoName)) {
            //return "[![InspecodeRocro Report](https://inspecode.rocro.com/badges/github.com/" + this.myUserName + "/" + localRepoName + "/report?token=" + inspecodeId + "&branch=master)]" +
            return "[![InspecodeRocro Report](https://inspecode.rocro.com/badges/github.com/" + this.myUserName + "/" + localRepoName + "/report?token=" + inspecodeId + ")]" +
                "(https://inspecode.rocro.com/reports/github.com/" + this.myUserName + "/" + localRepoName + "/branch/master/summary)";
        }
        return this.noMarkdown;
    }

    public GetInspecodeRocroStatus(localRepoName: string, inspecodeId: string) {
        if (this.ShowInspecodeRocroBadges(localRepoName)) {
            return "[![InspecodeRocro Job Status](https://inspecode.rocro.com/badges/github.com/" + this.myUserName + "/" + localRepoName + "/status?token=" + inspecodeId + ")]" +
                "(https://inspecode.rocro.com/jobs/github.com/" + this.myUserName + "/" + localRepoName + "/latest?completed=true)";
        }
        return this.noMarkdown;
    }

    public GetLgtmAlert(localRepoName: string) {
        if (this.ShowLgtmBadges(localRepoName)) {
            const userName = this.GetUserName(localRepoName);
            return "[![LGTM Alerts](https://img.shields.io/lgtm/alerts/g/" + userName + "/" + localRepoName + ".svg?logo=lgtm&logoWidth=18)]" +
                "(https://lgtm.com/projects/g/" + userName + "/" + localRepoName + "/alerts/)";
        }
        return this.noMarkdown;
    }

    public GetLgtmCodeQuality(localRepoName: string) {
        if (this.ShowLgtmBadges(localRepoName)) {
            const userName = this.GetUserName(localRepoName);
            return "[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/" + userName + "/" + localRepoName + ".svg?logo=lgtm&logoWidth=18)]" +
                "(https://lgtm.com/projects/g/" + userName + "/" + localRepoName + "/context:javascript)";
        }
        return this.noMarkdown;
    }

    public GetLicenceBadgeMarkdown() {
        return "[![License](" + shieldsDotIoUrl + "github/license/gittools/gitlink.svg)]" +
            "(/LICENSE.txt)";
    }

    public GetNugetDownloads(localRepoName: string) {
        return "[![Nuget downloads](" + shieldsDotIoUrl + "nuget/dt/" + localRepoName + ".svg)]" +
            "(https://www.nuget.org/packages/" + localRepoName + "/)";
    }

    public GetPoweredByReadMeSynchronizerBadgeMarkdown() {
        return `[![Read Me Synchronizer](${shieldsDotIoUrl}badge/-powered%20by%20read%20me%20synchronizer-brightgreen.svg)](${this.gitHubReadMeSynchronizerUrl})`;
    }

    public GetRenovateBotBadgeMarkdown() {
        return "[![Renovate Bot github](" + shieldsDotIoUrl + "badge/renovatebot-checked-brightgreen.svg)]" +
            "(https://renovatebot.com/)";
    }

    public GetSonarBadge(localRepoName: string, sonarMetaData: SonarMetaData) {
        if (this.ShowSonarBadges(localRepoName)) {
            const sonarDescription: string = "Sonar" + sonarMetaData.badgeQueryString;
            const badgeHyperlinkUrl = sonarMetaData.badgeHyperlinkTargetUrlPrefix + localRepoName + sonarMetaData.badgeHyperlinkTargetUrlSuffix;
            const sonarBadgeUrl = sonarBadgesUrlAddress + localRepoName + sonarMetaData.badgeQueryString;
            return `[![${sonarDescription}](${sonarBadgeUrl})](${badgeHyperlinkUrl})`;
        }
        return this.noMarkdown;
    }

    public GetSubscribeMarkdown(localRepoName: string) {
        return "[Subscribe](https://github.com/" + this.myUserName + "/" + localRepoName + "/subscription) to receive notificatons." + this.lineBreak;
    }

    public GetVisualStudioMarketplaceIDEDownloads(localRepoName: string) {
        return "[![Visual Studio Marketplace downloads](" + vsmarketplacebadgeAppHarborUrl + "installs/" + this.myUserName + "." + localRepoName + ".svg)]" +
            "(" + this.GetVisualStudioMarketplaceUrlPrefix() + localRepoName + ")";
    }

    public GetVisualStudioMarketplaceIDEItemBadge(localRepoName: string) {
        return "[![Visual Studio Marketplace version](" + shieldsDotIoUrl + "badge/-" + localRepoName + "-%23e2165e.svg)]" +
            "(" + this.GetVisualStudioMarketplaceUrlPrefix() + localRepoName + ")";
    }

    public GetVisualStudioMarketplaceIDERatings(localRepoName: string) {
        return "[![Visual Studio Marketplace ratings](" + vsmarketplacebadgeAppHarborUrl + "rating/" + this.myUserName + "." + localRepoName + ".svg)]" +
            "(" + this.GetVisualStudioMarketplaceUrlPrefix() + localRepoName + ")";
    }

    public GetVisualStudioMarketplaceIDEVersion(localRepoName: string) {
        return "[![Visual Studio Marketplace version](" + vsmarketplacebadgeAppHarborUrl + "version/" + this.myUserName + "." + localRepoName + ".svg)]" +
            "(" + this.GetVisualStudioMarketplaceUrlPrefix() + localRepoName + ")";
    }

    public GetVisualStudioMarketplaceVSTSDownloads(localRepoName: string, itemName: string) {
        return "[![Visual Studio Marketplace downloads](" + shieldsDotIoUrl + "vscode-marketplace/d/" + this.myUserName + "." + itemName + ".svg)]" +
            "(" + this.GetVisualStudioMarketplaceUrlPrefix() + itemName + ")";
    }

    public GetVisualStudioMarketplaceVSTSItemBadge(localRepoName: string, itemName: string) {
        return "[![Visual Studio Marketplace version](" + shieldsDotIoUrl + "badge/-" + localRepoName + "-%23e2165e.svg)]" +
            "(" + this.GetVisualStudioMarketplaceUrlPrefix() + itemName + ")";
    }

    public GetVisualStudioMarketplaceVSTSRatings(localRepoName: string, itemName: string) {
        return "[![Visual Studio Marketplace ratings](" + shieldsDotIoUrl + "vscode-marketplace/r/" + this.myUserName + "." + itemName + ".svg)]" +
            "(" + this.GetVisualStudioMarketplaceUrlPrefix() + itemName + "#review-details)";
    }

    public GetVisualStudioMarketplaceVSTSVersion(localRepoName: string, itemName: string) {
        return "[![Visual Studio Marketplace version](" + shieldsDotIoUrl + "vscode-marketplace/v/" + this.myUserName + "." + itemName + ".svg)]" +
            "(" + this.GetVisualStudioMarketplaceUrlPrefix() + itemName + ")";
    }

    //Privates...

    private DotSubstituion(localreponame: string) {
        return localreponame.replace(".", "-");
    }

    private GetGitHubUrlForRepo(localRepoName: string) {
        return "https://github.com/" + this.myUserName + "/" + localRepoName;
    }

    private GetRepoName(localRepoName: string): RepoNames {
        const repoName: RepoNames = RepoNames[localRepoName];
        return repoName;
    }

    private GetUserName(localRepoName: string) {
        let userName = this.myUserName;
        if (localRepoName == "AngularBasic") {
            userName = "MattJeanes";
        }
        if (localRepoName == "CleanArchitecture") {
            userName = "ardalis";//must be lower case
        }
        return userName;
    }

    private GetVisualStudioMarketplaceUrlPrefix() {
        return `${visualStudioMarketplaceUrl}${this.myUserName}.`;
    }

    // Show-ers TODO extract to separate .ts file
    private ShowAppveyorBadges(localRepoName: string): boolean {
        if (this.badgeExclusions.appveyor.includes(this.GetRepoName(localRepoName))) {
            return false;
        }
        return true;
    }

    private ShowAzurePipelineBadges(localRepoName: string): boolean {
        if (this.badgeExclusions.azurePipeline.includes(this.GetRepoName(localRepoName))) {
            return false;
        }
        return true;
    }

    private ShowBetterCodeHubBadges(localRepoName: string): boolean {
        if (this.badgeExclusions.bettercodehub.includes(this.GetRepoName(localRepoName))) {
            return false;
        }
        return true;
    }

    private ShowCodacyBadges(localRepoName: string): boolean {
        if (this.badgeExclusions.codacy.includes(this.GetRepoName(localRepoName))) {
            return false;
        }
        return true;
    }

    private ShowCodeBeatBadges(localRepoName: string): boolean {
        if (this.badgeExclusions.codebeat.includes(this.GetRepoName(localRepoName))) {
            return false;
        }
        return true;
    }

    private ShowCodeFactorBadges(localRepoName: string): boolean {
        if (this.badgeExclusions.codefactor.includes(this.GetRepoName(localRepoName))) {
            return false;
        }
        return true;
    }

    private ShowGitHubBadges(localRepoName: string): boolean {
        if (this.badgeExclusions.gitHub.includes(this.GetRepoName(localRepoName))) {
            return false;
        }
        return true;
    }

    private ShowInspecodeRocroBadges(localRepoName: string): boolean {
        if (this.badgeExclusions.inspecode.includes(this.GetRepoName(localRepoName))) {
            return false;
        }
        return true;
    }

    private ShowLgtmBadges(localRepoName: string): boolean {
        if (this.badgeExclusions.lgtm.includes(this.GetRepoName(localRepoName))) {
            return false;
        }
        return true;
    }

    private ShowSonarBadges(localRepoName: string): boolean {
        if (this.badgeExclusions.sonar.includes(this.GetRepoName(localRepoName))) {
            return false;
        }
        return true;
    }
}

//return "[![codecov](https://codecov.io/gh/" + this.myUserName + "/" + localRepoName + "/branch/master/graph/badge.svg)](https://codecov.io/gh/" + this.myUserName + "/" + localRepoName + ")";
//return "[![DepShield](https://depshield.sonatype.org/badges/" + this.myUserName + "/" + localRepoName + "/depshield.svg)]" + "(https://depshield.github.io)";
//return "[![Travis Build Status](https://travis-ci.org/" + this.myUserName + "/" + localRepoName + ".svg?branch=master)](https://travis-ci.org/" + this.myUserName + "/" + localRepoName + ")";
