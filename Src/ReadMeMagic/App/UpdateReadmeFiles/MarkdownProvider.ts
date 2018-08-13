const chromeWebStore = "chrome-web-store";
const myUserName = "GregTrevellick";
const shieldsDotIoUrl = "https://img.shields.io/";
const tweetsDevHumor = "vsts-extensions-tweets-Dev-Humor";
const visualStudioMarketplaceUrl = "https://marketplace.visualstudio.com/items?itemName=";
const vsmmWebstoreId = "fifncokofckhanlhmdacdnkbempmopbo";
const vsmmWebstoreUrl = "https://chrome.google.com/webstore/detail/visual-studio-marketplace/" + vsmmWebstoreId;
const vsmarketplacebadgeAppHarborUrl = "https://vsmarketplacebadge.apphb.com/";

export class MarkdownProvider {

    constructor() { }

    public GetLicenceBadgeMarkdown() {
        return "[![License](" + shieldsDotIoUrl + "github/license/gittools/gitlink.svg)](/LICENSE.txt)";
    }

    public GetAccessLintBadgeMarkdown() {
        return "[![Access Lint github](" + shieldsDotIoUrl + "badge/a11y-checked-green.svg)](https://www.accesslint.com)";
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

    public GetBetterCodeHubCompliance(localRepoName: string) {
        return "[![BetterCodeHub compliance](https://bettercodehub.com/edge/badge/" + myUserName + "/" + localRepoName + "?branch=master)](https://bettercodehub.com/results/" + myUserName + "/" + localRepoName + ")";
    }

    public GetCodacyBadge(localRepoName: string, codacyId: string) {
        return "[![Codacy Badge](https://api.codacy.com/project/badge/Grade/" + codacyId + ")]" +
            "(https://www.codacy.com/project/gtrevellick/" + localRepoName + "/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=" + myUserName + "/" + localRepoName + "&amp;utm_campaign=Badge_Grade_Dashboard)";
    }

    public GetCodeCov(localRepoName: string) {
        return "[![codecov](https://codecov.io/gh/" + myUserName + "/" + localRepoName + "/branch/master/graph/badge.svg)](https://codecov.io/gh/" + myUserName + "/" + localRepoName + ")";
    }

    public GetCodeFactor(localRepoName: string) {
        return "[![CodeFactor](https://www.codefactor.io/repository/github/" + myUserName + "/" + localRepoName + "/badge)](https://www.codefactor.io/repository/github/" + myUserName + "/" + localRepoName + ")";
    }

    public GetAppveyorBuildStatus(localRepoName: string) {
        const appVeyorRepoName = this.DotSubstituion(localRepoName);
        return "[![Appveyor Build status](https://ci.appveyor.com/api/projects/status/0vwmtcboontemltq?svg=true)](https://ci.appveyor.com/project/" + myUserName + "/" + appVeyorRepoName + ")";
    }

    public GetAppveyorUnitTests(localRepoName: string) {
        const appVeyorRepoName = this.DotSubstituion(localRepoName);
        return "[![Appveyor unit tests](" + shieldsDotIoUrl + "appveyor/tests/" + myUserName + "/" + appVeyorRepoName + ".svg)](https://ci.appveyor.com/project/" + myUserName + "/" + appVeyorRepoName + "/build/tests)";
    }

    public GetTravisBuildStatus(localRepoName: string) {
        return "[![Travis Build Status](https://travis-ci.org/" + myUserName + "/" + localRepoName + ".svg?branch=master)](https://travis-ci.org/" + myUserName + "/" + localRepoName + ")";
    }

    public GetImgBot(localRepoName: string) {
        return "[![ImgBot](" + shieldsDotIoUrl + "badge/images-optimized-green.svg)](https://imgbot.net/)";
    }

    public GetCharityWare(localRepoName: string) {
        return "[![Charity Ware](" + shieldsDotIoUrl + "badge/charity%20ware-thank%20you-brightgreen.svg)](https://github.com/" + myUserName + "/MiscellaneousArtefacts/wiki/Charity-Ware)";
    }

    public GetVisualStudioMarketplaceVSTSVersion(localRepoName: string) {
        return "[![Visual Studio Marketplace version](" + shieldsDotIoUrl + "vscode-marketplace/v/" + myUserName + "." + tweetsDevHumor + ".svg)](" + visualStudioMarketplaceUrl + myUserName + "." + tweetsDevHumor +")";
    }

    public GetVisualStudioMarketplaceVSTSDownloads(localRepoName: string) {
        return "[![Visual Studio Marketplace downloads](" + shieldsDotIoUrl + "vscode-marketplace/d/" + myUserName + "." + tweetsDevHumor + ".svg)](" + visualStudioMarketplaceUrl + myUserName + "." + tweetsDevHumor +")";
    }

    public GetVisualStudioMarketplaceVSTSRatings(localRepoName: string) {
        return "[![Visual Studio Marketplace ratings](" + shieldsDotIoUrl + "vscode-marketplace/r/" + myUserName + "." + tweetsDevHumor + ".svg)](" + visualStudioMarketplaceUrl + myUserName + "." + tweetsDevHumor +"#review-details)";
    }

    public GetVisualStudioMarketplaceIDEVersion(localRepoName: string) {
        return "[![Visual Studio Marketplace version](" + vsmarketplacebadgeAppHarborUrl + "version/" + myUserName + "." + localRepoName + ".svg)](" + visualStudioMarketplaceUrl + myUserName + "." + localRepoName + ")";
    }

    public GetVisualStudioMarketplaceIDEDownloads(localRepoName: string) {
        return "[![Visual Studio Marketplace downloads](" + vsmarketplacebadgeAppHarborUrl + "installs/" + myUserName + "." + localRepoName + ".svg)](" + visualStudioMarketplaceUrl + myUserName + "." + localRepoName + ")";
    }

    public GetVisualStudioMarketplaceIDERatings(localRepoName: string) {
        return "[![Visual Studio Marketplace ratings](" + vsmarketplacebadgeAppHarborUrl + "rating/" + myUserName + "." + localRepoName + ".svg)](" + visualStudioMarketplaceUrl + myUserName + "." + localRepoName + ")";
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
