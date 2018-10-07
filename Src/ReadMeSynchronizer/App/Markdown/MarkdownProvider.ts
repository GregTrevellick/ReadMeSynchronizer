import { SonarMetaData } from "./SonarMetaData";

const chromeWebStore = "chrome-web-store";
const shieldsDotIoUrl = "https://img.shields.io/";
const sonarBadgesUrlAddress = "https://sonarcloud.io/api/project_badges/measure?project=";
const visualStudioMarketplaceUrl = "https://marketplace.visualstudio.com/items?itemName=";
const vsmarketplacebadgeAppHarborUrl = "https://vsmarketplacebadge.apphb.com/";
const vsmmWebstoreId = "fifncokofckhanlhmdacdnkbempmopbo";
const vsmmWebstoreUrl = "https://chrome.google.com/webstore/detail/visual-studio-marketplace/" + vsmmWebstoreId;

export class MarkdownProvider {

    private lineBreak: string = "\n";//gregt dedupe
    public myUserName = "GregTrevellick";
    public gitHubReadMeSynchronizerUrl = `https://github.com/${this.myUserName}/ReadMeSynchronizer`;

    constructor() { }

    //TODO convert all methods below to call a common method that returns the md, passing description + badge URL + hyperlink URL & returns square braces & curved brackets

    public GetSubscribeMarkdown(localRepoName: string) {
        return "[Subscribe](https://github.com/" + this.myUserName + "/" + localRepoName + "/subscription) to receive notificatons." + this.lineBreak;
    }

    public GetPoweredByReadMeSynchronizerBadgeMarkdown() {
        return `[![Read Me Synchronizer](${shieldsDotIoUrl}badge/-powered%20by%20read%20me%20synchronizer-brightgreen.svg)](${this.gitHubReadMeSynchronizerUrl})`;
    }

    public GetLicenceBadgeMarkdown() {
        return "[![License](" + shieldsDotIoUrl + "github/license/gittools/gitlink.svg)](/LICENSE.txt)";
    }

    public GetAccessLintBadgeMarkdown() {
        return "[![Access Lint github](" + shieldsDotIoUrl + "badge/a11y-checked-brightgreen.svg)](https://www.accesslint.com)";
    }

    public GetRenovateBotBadgeMarkdown() {
        return "[![Renovate Bot github](" + shieldsDotIoUrl + "badge/renovatebot-checked-brightgreen.svg)](https://renovatebot.com/)";
    }

    public GetGitHubTopLanguage(localRepoName: string) {
        return "[![GitHub top language](" + shieldsDotIoUrl + "github/languages/top/" + this.myUserName + "/" + localRepoName + ".svg)](" + this.GetGitHubUrlForRepo(localRepoName) + ")";
    }

    public GetGitHubLanguageCount(localRepoName: string) {
        return "[![Github language count](" + shieldsDotIoUrl + "github/languages/count/" + this.myUserName + "/" + localRepoName + ".svg)](" + this.GetGitHubUrlForRepo(localRepoName) + ")";
    }

    public GetGitHubIssues(localRepoName: string) {
        return "[![GitHub issues](" + shieldsDotIoUrl + "github/issues-raw/" + this.myUserName + "/" + localRepoName + ".svg)](" + this.GetGitHubUrlForRepo(localRepoName) + "/issues)";
    }

    public GetGitHubPullRequests(localRepoName: string) {
        return "[![GitHub pull requests](" + shieldsDotIoUrl + "github/issues-pr-raw/" + this.myUserName + "/" + localRepoName + ".svg)](" + this.GetGitHubUrlForRepo(localRepoName) + "/pulls)";
    }

    public GetSonarBadge(localRepoName: string, sonarMetaData: SonarMetaData) {
        const sonarDescription: string = "Sonar" + sonarMetaData.badgeQueryString;
        const badgeHyperlinkUrl = sonarMetaData.badgeHyperlinkTargetUrlPrefix + localRepoName + sonarMetaData.badgeHyperlinkTargetUrlSuffix;
        const sonarBadgeUrl = sonarBadgesUrlAddress + localRepoName + sonarMetaData.badgeQueryString;
        return `[![${sonarDescription}](${sonarBadgeUrl})](${badgeHyperlinkUrl})`;
    }

    public GetAppveyorBuildStatus(localRepoName: string, appVeyorId?: string) {
        if (appVeyorId != undefined) {
            const appVeyorRepoName = this.DotSubstituion(localRepoName);
            return "[![Appveyor Build status](https://ci.appveyor.com/api/projects/status/" + appVeyorId + "?svg=true)](https://ci.appveyor.com/project/" + this.myUserName + "/" + appVeyorRepoName + ")";
        }
        else {
            return "";
        }
    }

    public GetAppveyorUnitTests(localRepoName: string) {
        const appVeyorRepoName = this.DotSubstituion(localRepoName);
        return "[![Appveyor unit tests](" + shieldsDotIoUrl + "appveyor/tests/" + this.myUserName + "/" + appVeyorRepoName + ".svg)](https://ci.appveyor.com/project/" + this.myUserName + "/" + appVeyorRepoName + "/build/tests)";
    }

    public GetAzurePipelineBuildStatus(localRepoName: string, azureDefinitionId: string) {
        return "[![Azure Build Status](https://gregtrevellick.visualstudio.com/" + localRepoName + "/_apis/build/status/" + localRepoName + ")]" +
            "(https://gregtrevellick.visualstudio.com/" + localRepoName + "/_build/latest?definitionId=" + azureDefinitionId + ")";
    }

    public GetBetterCodeHubCompliance(localRepoName: string) {
        return "[![BetterCodeHub compliance](https://bettercodehub.com/edge/badge/" + this.myUserName + "/" + localRepoName + "?branch=master)](https://bettercodehub.com/results/" + this.myUserName + "/" + localRepoName + ")";
    }

    public GetCodacyBadge(localRepoName: string, codacyId: string) {
        return "[![Codacy Badge](https://api.codacy.com/project/badge/Grade/" + codacyId + ")]" +
            "(https://www.codacy.com/project/gtrevellick/" + localRepoName + "/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=" + this.myUserName + "/" + localRepoName + "&amp;utm_campaign=Badge_Grade_Dashboard)";
    }

    //public GetCodeCov(localRepoName: string) {
    //    return "[![codecov](https://codecov.io/gh/" + this.myUserName + "/" + localRepoName + "/branch/master/graph/badge.svg)](https://codecov.io/gh/" + this.myUserName + "/" + localRepoName + ")";
    //}

    //public GetTravisBuildStatus(localRepoName: string) {
    //    return "[![Travis Build Status](https://travis-ci.org/" + this.myUserName + "/" + localRepoName + ".svg?branch=master)](https://travis-ci.org/" + this.myUserName + "/" + localRepoName + ")";
    //}

    public GetCodeFactor(localRepoName: string) {
        return "[![CodeFactor](https://www.codefactor.io/repository/github/" + this.myUserName + "/" + localRepoName + "/badge)](https://www.codefactor.io/repository/github/" + this.myUserName + "/" + localRepoName + ")";
    }

    public GetImgBot(localRepoName: string) {
        return "[![ImgBot](" + shieldsDotIoUrl + "badge/images-optimized-brightgreen.svg)](https://imgbot.net/)";
    }

    public GetCharityWare(localRepoName: string) {
        return "[![Charity Ware](" + shieldsDotIoUrl + "badge/charity%20ware-thank%20you-brightgreen.svg)](https://github.com/" + this.myUserName + "/MiscellaneousArtefacts/wiki/Charity-Ware)";
    }

    public GetVisualStudioMarketplaceVSTSItemBadge(localRepoName: string, itemName: string) {
        return "[![Visual Studio Marketplace version](" + shieldsDotIoUrl + "badge/-" + localRepoName + "-%23e2165e.svg)](" + this.GetVisualStudioMarketplaceUrlPrefix() + itemName + ")";
    }

    public GetVisualStudioMarketplaceVSTSVersion(localRepoName: string, itemName: string) {
        return "[![Visual Studio Marketplace version](" + shieldsDotIoUrl + "vscode-marketplace/v/" + this.myUserName + "." + itemName + ".svg)](" + this.GetVisualStudioMarketplaceUrlPrefix() + itemName + ")";
    }

    public GetVisualStudioMarketplaceVSTSDownloads(localRepoName: string, itemName: string) {
        return "[![Visual Studio Marketplace downloads](" + shieldsDotIoUrl + "vscode-marketplace/d/" + this.myUserName + "." + itemName + ".svg)](" + this.GetVisualStudioMarketplaceUrlPrefix() + itemName + ")";
    }

    public GetVisualStudioMarketplaceVSTSRatings(localRepoName: string, itemName: string) {
        return "[![Visual Studio Marketplace ratings](" + shieldsDotIoUrl + "vscode-marketplace/r/" + this.myUserName + "." + itemName + ".svg)](" + this.GetVisualStudioMarketplaceUrlPrefix() + itemName + "#review-details)";
    }

    public GetVisualStudioMarketplaceIDEItemBadge(localRepoName: string) {
        return "[![Visual Studio Marketplace version](" + shieldsDotIoUrl + "badge/-" + localRepoName + "-%23e2165e.svg)](" + this.GetVisualStudioMarketplaceUrlPrefix() + localRepoName + ")";
    }

    public GetVisualStudioMarketplaceIDEVersion(localRepoName: string) {
        return "[![Visual Studio Marketplace version](" + vsmarketplacebadgeAppHarborUrl + "version/" + this.myUserName + "." + localRepoName + ".svg)](" + this.GetVisualStudioMarketplaceUrlPrefix() + localRepoName + ")";
    }

    public GetVisualStudioMarketplaceIDEDownloads(localRepoName: string) {
        return "[![Visual Studio Marketplace downloads](" + vsmarketplacebadgeAppHarborUrl + "installs/" + this.myUserName + "." + localRepoName + ".svg)](" + this.GetVisualStudioMarketplaceUrlPrefix() + localRepoName + ")";
    }

    public GetVisualStudioMarketplaceIDERatings(localRepoName: string) {
        return "[![Visual Studio Marketplace ratings](" + vsmarketplacebadgeAppHarborUrl + "rating/" + this.myUserName + "." + localRepoName + ".svg)](" + this.GetVisualStudioMarketplaceUrlPrefix() + localRepoName + ")";
    }

    private GetVisualStudioMarketplaceUrlPrefix() {
        return `${visualStudioMarketplaceUrl}${this.myUserName}.`;
    }

    public GetNugetDownloads(localRepoName: string) {
        return "[![Nuget downloads](" + shieldsDotIoUrl + "nuget/dt/" + localRepoName + ".svg)](https://www.nuget.org/packages/" + localRepoName + "/)";
    }

    public GetChromeWebstoreVersion(localRepoName: string) {
        return "[![Chrome webstore version](" + shieldsDotIoUrl + chromeWebStore + "/v/" + vsmmWebstoreId + ".svg)](" + vsmmWebstoreUrl +")";
    }

    public GetChromeWebstoreUsers(localRepoName: string) {
        return "[![Chrome webstore users](" + shieldsDotIoUrl + chromeWebStore + "/users/" + vsmmWebstoreId + ".svg)](" + vsmmWebstoreUrl + ")";
    }

    public GetChromeWebstoreRating(localRepoName: string) {
        return "[![Chrome webstore rating](" + shieldsDotIoUrl + chromeWebStore + "/rating/" + vsmmWebstoreId + ".svg)](" + vsmmWebstoreUrl + "/reviews)";
    }

    private GetGitHubUrlForRepo(localRepoName: string) {
        return "https://github.com/" + this.myUserName + "/" + localRepoName;
    }

    private DotSubstituion(localreponame: string) {
        return localreponame.replace(".", "-");
    }
}
