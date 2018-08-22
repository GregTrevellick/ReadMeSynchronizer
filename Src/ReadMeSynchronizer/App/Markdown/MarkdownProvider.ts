import { SonarMetaData } from "./SonarMetaData";

const chromeWebStore = "chrome-web-store";
const myUserName = "GregTrevellick";
const shieldsDotIoUrl = "https://img.shields.io/";
const sonarBadgesUrlAddress = "https://sonarcloud.io/api/project_badges/measure?project=";
const visualStudioMarketplaceUrl = "https://marketplace.visualstudio.com/items?itemName=";
const vsmarketplacebadgeAppHarborUrl = "https://vsmarketplacebadge.apphb.com/";
const vsmmWebstoreId = "fifncokofckhanlhmdacdnkbempmopbo";
const vsmmWebstoreUrl = "https://chrome.google.com/webstore/detail/visual-studio-marketplace/" + vsmmWebstoreId;

export class MarkdownProvider {

    constructor() { }

    public GetPoweredByReadMeSynchronizerBadgeMarkdown() {
        return "[![Read Me Synchronizer](" + shieldsDotIoUrl + "badge/-badges%20powered%20by%20Read%20Me%20Synchronizer-green.svg)](https://github.com/GregTrevellick/ReadMeSynchronizer)";
    }

    public GetLicenceBadgeMarkdown() {
        return "[![License](" + shieldsDotIoUrl + "github/license/gittools/gitlink.svg)](/LICENSE.txt)";
    }

    public GetAccessLintBadgeMarkdown() {
        return "[![Access Lint github](" + shieldsDotIoUrl + "badge/a11y-checked-green.svg)](https://www.accesslint.com)";
    }

    public GetRenovateBotBadgeMarkdown() {
        return "[![Renovate Bot github](" + shieldsDotIoUrl + "badge/renovatebot-checked-green.svg)](https://renovatebot.com/)";
    }

    public GetGitHubTopLanguage(localRepoName: string) {
        return "[![GitHub top language](" + shieldsDotIoUrl + "github/languages/top/" + myUserName + "/" + localRepoName + ".svg)](" + this.GetGitHubUrlForRepo(localRepoName) + ")";
    }

    public GetGitHubLanguageCount(localRepoName: string) {
        return "[![Github language count](" + shieldsDotIoUrl + "github/languages/count/" + myUserName + "/" + localRepoName + ".svg)](" + this.GetGitHubUrlForRepo(localRepoName) + ")";
    }

    public GetGitHubPullRequests(localRepoName: string) {
        return "[![GitHub pull requests](" + shieldsDotIoUrl + "github/issues-pr-raw/" + myUserName + "/" + localRepoName + ".svg)](" + this.GetGitHubUrlForRepo(localRepoName) + "/pulls)";
    }

    public GetSonarBadge(localRepoName: string, sonarMetaData: SonarMetaData) {
        const sonarDescription: string = "Sonar" + sonarMetaData.badgeQueryString;
        const badgeHyperlinkUrl = sonarMetaData.badgeHyperlinkTargetUrlPrefix + localRepoName + sonarMetaData.badgeHyperlinkTargetUrlSuffix;
        const sonarBadgeUrl = sonarBadgesUrlAddress + localRepoName + sonarMetaData.badgeQueryString;
        return `[![${sonarDescription}](${sonarBadgeUrl})](${badgeHyperlinkUrl})`;
    }

    public GetBetterCodeHubCompliance(localRepoName: string) {
        return "[![BetterCodeHub compliance](https://bettercodehub.com/edge/badge/" + myUserName + "/" + localRepoName + "?branch=master)](https://bettercodehub.com/results/" + myUserName + "/" + localRepoName + ")";
    }

    public GetCodacyBadge(localRepoName: string, codacyId: string) {
        return "[![Codacy Badge](https://api.codacy.com/project/badge/Grade/" + codacyId + ")]" +
            "(https://www.codacy.com/project/gtrevellick/" + localRepoName + "/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=" + myUserName + "/" + localRepoName + "&amp;utm_campaign=Badge_Grade_Dashboard)";
    }

    //codecov temporarily disabled
    public GetCodeCov(localRepoName: string) {
        return "[![codecov](https://codecov.io/gh/" + myUserName + "/" + localRepoName + "/branch/master/graph/badge.svg)](https://codecov.io/gh/" + myUserName + "/" + localRepoName + ")";
    }

    public GetCodeFactor(localRepoName: string) {
        return "[![CodeFactor](https://www.codefactor.io/repository/github/" + myUserName + "/" + localRepoName + "/badge)](https://www.codefactor.io/repository/github/" + myUserName + "/" + localRepoName + ")";
    }

    public GetAppveyorBuildStatus(localRepoName: string, appVeyorId: string) {
        const appVeyorRepoName = this.DotSubstituion(localRepoName);
        return "[![Appveyor Build status](https://ci.appveyor.com/api/projects/status/" + appVeyorId + "?svg=true)](https://ci.appveyor.com/project/" + myUserName + "/" + appVeyorRepoName + ")";
    }

    public GetAppveyorUnitTests(localRepoName: string) {
        const appVeyorRepoName = this.DotSubstituion(localRepoName);
        return "[![Appveyor unit tests](" + shieldsDotIoUrl + "appveyor/tests/" + myUserName + "/" + appVeyorRepoName + ".svg)](https://ci.appveyor.com/project/" + myUserName + "/" + appVeyorRepoName + "/build/tests)";
    }

    //travis build temporarily disabled
    public GetTravisBuildStatus(localRepoName: string) {
        return "[![Travis Build Status](https://travis-ci.org/" + myUserName + "/" + localRepoName + ".svg?branch=master)](https://travis-ci.org/" + myUserName + "/" + localRepoName + ")";
    }

    public GetImgBot(localRepoName: string) {
        return "[![ImgBot](" + shieldsDotIoUrl + "badge/images-optimized-green.svg)](https://imgbot.net/)";
    }

    public GetCharityWare(localRepoName: string) {
        return "[![Charity Ware](" + shieldsDotIoUrl + "badge/charity%20ware-thank%20you-brightgreen.svg)](https://github.com/" + myUserName + "/MiscellaneousArtefacts/wiki/Charity-Ware)";
    }

    public GetVisualStudioMarketplaceVSTSItemBadge(localRepoName: string, itemName: string) {
        return "[![Visual Studio Marketplace version](" + shieldsDotIoUrl + "badge/-" + localRepoName + "-%23e2165e.svg)](" + this.GetVisualStudioMarketplaceUrlPrefix() + itemName + ")";
    }

    public GetVisualStudioMarketplaceVSTSVersion(localRepoName: string, itemName: string) {
        return "[![Visual Studio Marketplace version](" + shieldsDotIoUrl + "vscode-marketplace/v/" + myUserName + "." + itemName + ".svg)](" + this.GetVisualStudioMarketplaceUrlPrefix() + itemName + ")";
    }

    public GetVisualStudioMarketplaceVSTSDownloads(localRepoName: string, itemName: string) {
        return "[![Visual Studio Marketplace downloads](" + shieldsDotIoUrl + "vscode-marketplace/d/" + myUserName + "." + itemName + ".svg)](" + this.GetVisualStudioMarketplaceUrlPrefix() + itemName + ")";
    }

    public GetVisualStudioMarketplaceVSTSRatings(localRepoName: string, itemName: string) {
        return "[![Visual Studio Marketplace ratings](" + shieldsDotIoUrl + "vscode-marketplace/r/" + myUserName + "." + itemName + ".svg)](" + this.GetVisualStudioMarketplaceUrlPrefix() + itemName + "#review-details)";
    }

    public GetVisualStudioMarketplaceIDEItemBadge(localRepoName: string) {
        return "[![Visual Studio Marketplace version](" + shieldsDotIoUrl + "badge/-" + localRepoName + "-%23e2165e.svg)](" + this.GetVisualStudioMarketplaceUrlPrefix() + localRepoName + ")";
    }

    public GetVisualStudioMarketplaceIDEVersion(localRepoName: string) {
        return "[![Visual Studio Marketplace version](" + vsmarketplacebadgeAppHarborUrl + "version/" + myUserName + "." + localRepoName + ".svg)](" + this.GetVisualStudioMarketplaceUrlPrefix() + localRepoName + ")";
    }

    public GetVisualStudioMarketplaceIDEDownloads(localRepoName: string) {
        return "[![Visual Studio Marketplace downloads](" + vsmarketplacebadgeAppHarborUrl + "installs/" + myUserName + "." + localRepoName + ".svg)](" + this.GetVisualStudioMarketplaceUrlPrefix() + localRepoName + ")";
    }

    public GetVisualStudioMarketplaceIDERatings(localRepoName: string) {
        return "[![Visual Studio Marketplace ratings](" + vsmarketplacebadgeAppHarborUrl + "rating/" + myUserName + "." + localRepoName + ".svg)](" + this.GetVisualStudioMarketplaceUrlPrefix() + localRepoName + ")";
    }

    private GetVisualStudioMarketplaceUrlPrefix() {
        return `${visualStudioMarketplaceUrl}${myUserName}.`;
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
        return "https://github.com/" + myUserName + "/" + localRepoName;
    }

    private DotSubstituion(localreponame: string) {
        return localreponame.replace(".", "-");
    }
}
