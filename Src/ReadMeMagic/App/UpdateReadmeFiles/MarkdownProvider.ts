const chromeWebStore = "chrome-web-store";
const myUserName = "GregTrevellick";
const shieldsDotIoUrl = "https://img.shields.io/";
const tweetsDevHumor = "vsts-extensions-tweets-Dev-Humor";
const visualStudioMarketplaceUrl = "https://marketplace.visualstudio.com/items?itemName=";
const vsmmWebstoreId = "fifncokofckhanlhmdacdnkbempmopbo";
const vsmmWebstoreUrl = "https://chrome.google.com/webstore/detail/visual-studio-marketplace/" + vsmmWebstoreId;

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

    private GetGitHubUrlForRepo(localRepoName: string) {
        return "https://github.com/" + myUserName + "/" + localRepoName;
    }

    public GetBetterCodeHubCompliance(localRepoName: string) {
        return "[![BetterCodeHub compliance](https://bettercodehub.com/edge/badge/" + myUserName + "/" + localRepoName + "?branch=master)](https://bettercodehub.com/results/" + myUserName + "/" + localRepoName + ")";
    }

    public GetCodacyBadge(hostedRepoName: string, codacyId: string) {
        return "[![Codacy Badge](https://api.codacy.com/project/badge/Grade/" + codacyId + ")](https://www.codacy.com/project/gtrevellick/" + hostedRepoName + "/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=" + myUserName + "/" + hostedRepoName + "&amp;utm_campaign=Badge_Grade_Dashboard)";
    }

    public GetCodeCov(hostedRepoName: string) {
        return "[![codecov](https://codecov.io/gh/" + myUserName + "/" + hostedRepoName + "/branch/master/graph/badge.svg)](https://codecov.io/gh/" + myUserName + "/" + hostedRepoName + ")";
    }

    public GetCodeFactor(localRepoName: string) {
        return "[![CodeFactor](https://www.codefactor.io/repository/github/" + myUserName + "/" + localRepoName + "/badge)](https://www.codefactor.io/repository/github/" + myUserName + "/" + localRepoName + ")";
    }

    public GetAppveyorBuildStatus(localRepoName: string) {
        let appVeyorRepoName = this.DotSubstituion(localRepoName);
        return "[![Appveyor Build status](https://ci.appveyor.com/api/projects/status/0vwmtcboontemltq?svg=true)](https://ci.appveyor.com/project/" + myUserName + "/" + appVeyorRepoName + ")";
    }

    public GetAppveyorUnitTests(localRepoName: string) {
        let appVeyorRepoName = this.DotSubstituion(localRepoName);
        return "[![Appveyor unit tests](" + shieldsDotIoUrl + "appveyor/tests/" + myUserName + "/" + appVeyorRepoName + ".svg)](https://ci.appveyor.com/project/" + myUserName + "/" + appVeyorRepoName + "/build/tests)";
    }

    private DotSubstituion(localreponame: string) {
        return localreponame.replace(".", "-");
    }

    public GetTravisBuildStatus(hostedRepoName: string) {
        return "[![Travis Build Status](https://travis-ci.org/" + myUserName + "/" + hostedRepoName + ".svg?branch=master)](https://travis-ci.org/" + myUserName + "/" + hostedRepoName + ")";
    }

    public GetImgBot(hostedRepoName: string) {
        return "[![ImgBot](" + shieldsDotIoUrl + "badge/images-optimized-green.svg)](https://imgbot.net/)";
    }

    public GetCharityWare(hostedRepoName: string) {
        return "[![Charity Ware](" + shieldsDotIoUrl + "badge/charity%20ware-thank%20you-brightgreen.svg)](https://github.com/" + myUserName + "/MiscellaneousArtefacts/wiki/Charity-Ware)";
    }

    public GetVisualStudioMarketplaceVSTSVersion(hostedRepoName: string) {
        return "[![Visual Studio Marketplace version](" + shieldsDotIoUrl + "vscode-marketplace/v/" + myUserName + "." + tweetsDevHumor + ".svg)](" + visualStudioMarketplaceUrl + myUserName + "." + tweetsDevHumor +")";
    }

    public GetVisualStudioMarketplaceVSTSDownloads(hostedRepoName: string) {
        return "[![Visual Studio Marketplace downloads](" + shieldsDotIoUrl + "vscode-marketplace/d/" + myUserName + "." + tweetsDevHumor + ".svg)](" + visualStudioMarketplaceUrl + myUserName + "." + tweetsDevHumor +")";
    }

    public GetVisualStudioMarketplaceVSTSRatings(hostedRepoName: string) {
        return "[![Visual Studio Marketplace ratings](" + shieldsDotIoUrl + "vscode-marketplace/r/" + myUserName + "." + tweetsDevHumor + ".svg)](" + visualStudioMarketplaceUrl + myUserName + "." + tweetsDevHumor +"#review-details)";
    }

    public GetVisualStudioMarketplaceIDEVersion(hostedRepoName: string) {
        return "[![Visual Studio Marketplace version](https://vsmarketplacebadge.apphb.com/version/" + myUserName + "." + hostedRepoName + ".svg)](" + visualStudioMarketplaceUrl + myUserName + "." + hostedRepoName + ")";
    }

    public GetVisualStudioMarketplaceIDEDownloads(hostedRepoName: string) {
        return "[![Visual Studio Marketplace downloads](https://vsmarketplacebadge.apphb.com/installs/" + myUserName + "." + hostedRepoName + ".svg)](" + visualStudioMarketplaceUrl + myUserName + "." + hostedRepoName + ")";
    }

    public GetVisualStudioMarketplaceIDERatings(hostedRepoName: string) {
        return "[![Visual Studio Marketplace ratings](https://vsmarketplacebadge.apphb.com/rating/" + myUserName + "." + hostedRepoName + ".svg)](" + visualStudioMarketplaceUrl + myUserName + "." + hostedRepoName + ")";
    }

    public GetNugetDownloads(hostedRepoName: string) {
        return "[![Nuget downloads](" + shieldsDotIoUrl + "nuget/dt/" + hostedRepoName + ".svg)](https://www.nuget.org/packages/" + hostedRepoName + "/)";
    }

    public GetChromeWebstoreVersion(hostedRepoName: string) {
        return "[![Chrome webstore version](" + shieldsDotIoUrl + chromeWebStore + "/v/" + vsmmWebstoreId + ".svg)](" + vsmmWebstoreUrl +")";
    }

    public GetChromeWebstoreUsers(hostedRepoName: string) {
        return "[![Chrome webstore users](" + shieldsDotIoUrl + chromeWebStore + "/users/" + vsmmWebstoreId + ".svg)](" + vsmmWebstoreUrl + ")";
    }

    public GetChromeWebstoreRating(hostedRepoName: string) {
        return "[![Chrome webstore rating](" + shieldsDotIoUrl + chromeWebStore + "/rating/" + vsmmWebstoreId + ".svg)](" + vsmmWebstoreUrl + "/reviews)";
    }
}
