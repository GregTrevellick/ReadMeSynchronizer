export class MarkdownProvider {

    constructor() { }

    public GetLicenceBadgeMarkdown() {
        return "[![License](https://img.shields.io/github/license/gittools/gitlink.svg)](/LICENSE.txt)";
    }

    public GetAccessLintBadgeMarkdown() {
        return "[![Access Lint github](https://img.shields.io/badge/a11y-checked-green.svg)](https://www.accesslint.com)";
    }

    public GetGitHubTopLanguage(hostedRepoName: string) {
        return "[![GitHub top language](https://img.shields.io/github/languages/top/GregTrevellick/" + hostedRepoName + ".svg)](" + this.GetGitHubUrlForRepo(hostedRepoName) + ")";
    }

    public GetGitHubLanguageCount(hostedRepoName: string) {
        return "[![Github language count](https://img.shields.io/github/languages/count/GregTrevellick/" + hostedRepoName + ".svg)](" + this.GetGitHubUrlForRepo(hostedRepoName) + ")";
    }

    public GetGitHubPullRequests(hostedRepoName: string) {
        return "[![GitHub pull requests](https://img.shields.io/github/issues-pr-raw/GregTrevellick/" + hostedRepoName + ".svg)](" + this.GetGitHubUrlForRepo(hostedRepoName) + ")";
    }

    private GetGitHubUrlForRepo(hostedRepoName: string) {
        return "https://github.com/GregTrevellick/" + hostedRepoName;
    }

    public GetBetterCodeHubCompliance(hostedRepoName: string) {
        return "[![BetterCodeHub compliance](https://bettercodehub.com/edge/badge/GregTrevellick/" + hostedRepoName + "?branch=master)](https://bettercodehub.com/results/GregTrevellick/" + hostedRepoName + ")";
    }

    public GetCodacyBadge(hostedRepoName: string) {
        return "[![Codacy Badge](https://api.codacy.com/project/badge/Grade/e0cb8a23f42c4859aeb5c653b1a3d2b6)](https://www.codacy.com/project/gtrevellick/" + hostedRepoName + "/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=GregTrevellick/" + hostedRepoName + "&amp;utm_campaign=Badge_Grade_Dashboard)";
    }

    public GetCodeCov(hostedRepoName: string) {
        return "[![codecov](https://codecov.io/gh/GregTrevellick/" + hostedRepoName + "/branch/master/graph/badge.svg)](https://codecov.io/gh/GregTrevellick/" + hostedRepoName + ")";
    }

    public GetCodeFactor(hostedRepoName: string) {
        return "[![CodeFactor](https://www.codefactor.io/repository/github/gregtrevellick/" + hostedRepoName + "/badge)](https://www.codefactor.io/repository/github/gregtrevellick/" + hostedRepoName + ")";
    }

    public GetAppveyorBuildStatus(hostedRepoName: string) {
        return "[![Appveyor Build status](https://ci.appveyor.com/api/projects/status/0vwmtcboontemltq?svg=true)](https://ci.appveyor.com/project/GregTrevellick/openinapp-launcher)";
    }

    public GetAppveyorUnitTests(hostedRepoName: string) {
        return "[![Appveyor unit tests](https://img.shields.io/appveyor/tests/GregTrevellick/OpenInApp-Launcher.svg)](https://ci.appveyor.com/project/GregTrevellick/OpenInApp-Launcher/build/tests)";
    }

    public GetTravisBuildStatus(hostedRepoName: string) {
        return "[![Travis Build Status](https://travis-ci.org/GregTrevellick/" + hostedRepoName + ".svg?branch=master)](https://travis-ci.org/GregTrevellick/" + hostedRepoName + ")";
    }

    public GetImgBot(hostedRepoName: string) {
        return "[![ImgBot](https://img.shields.io/badge/images-optimized-green.svg)](https://imgbot.net/)";
    }

    public GetCharityWare(hostedRepoName: string) {
        return "[![Charity Ware](https://img.shields.io/badge/charity%20ware-thank%20you-brightgreen.svg)](https://github.com/GregTrevellick/MiscellaneousArtefacts/wiki/Charity-Ware)";
    }

    public GetAccessLintSocial(hostedRepoName: string) {
        return "[![Access Lint social](https://img.shields.io/badge/a11y-accesslint-green.svg?style=social&label=a11y)](https://twitter.com/accesslint)";
    }

    public GetVisualStudioMarketplaceVSTSVersion(hostedRepoName: string) {
        return "[![Visual Studio Marketplace version](https://img.shields.io/vscode-marketplace/v/GregTrevellick.vsts-extensions-tweets-Dev-Humor.svg)](https://marketplace.visualstudio.com/items?itemName=GregTrevellick.vsts-extensions-tweets-Dev-Humor)";
    }

    public GetVisualStudioMarketplaceVSTSDownloads(hostedRepoName: string) {
        return "[![Visual Studio Marketplace downloads](https://img.shields.io/vscode-marketplace/d/GregTrevellick.vsts-extensions-tweets-Dev-Humor.svg)](https://marketplace.visualstudio.com/items?itemName=GregTrevellick.vsts-extensions-tweets-Dev-Humor)";
    }

    public GetVisualStudioMarketplaceVSTSRatings(hostedRepoName: string) {
        return "[![Visual Studio Marketplace ratings](https://img.shields.io/vscode-marketplace/r/GregTrevellick.vsts-extensions-tweets-Dev-Humor.svg)](https://marketplace.visualstudio.com/items?itemName=GregTrevellick.vsts-extensions-tweets-Dev-Humor#review-details)";
    }

    public GetVisualStudioMarketplaceIDEVersion(hostedRepoName: string) {
        return "[![Visual Studio Marketplace version](https://vsmarketplacebadge.apphb.com/version/GregTrevellick." + hostedRepoName + ".svg)](https://marketplace.visualstudio.com/items?itemName=GregTrevellick." + hostedRepoName + ")";
    }

    public GetVisualStudioMarketplaceIDEDownloads(hostedRepoName: string) {
        return "[![Visual Studio Marketplace downloads](https://vsmarketplacebadge.apphb.com/installs/GregTrevellick." + hostedRepoName + ".svg)](https://marketplace.visualstudio.com/items?itemName=GregTrevellick." + hostedRepoName + ")";
    }

    public GetVisualStudioMarketplaceIDERatings(hostedRepoName: string) {
        return "[![Visual Studio Marketplace ratings](https://vsmarketplacebadge.apphb.com/rating/GregTrevellick." + hostedRepoName + ".svg)](https://marketplace.visualstudio.com/items?itemName=GregTrevellick." + hostedRepoName + ")";
    }

    public GetNugetDownloads(hostedRepoName: string) {
        return "[![Nuget downloads](https://img.shields.io/nuget/dt/DotNetFlags.svg)](https://www.nuget.org/packages/DotNetFlags/)";
    }

    public GetChromeWebstoreVersion(hostedRepoName: string) {
        return "[![Chrome webstore version](https://img.shields.io/chrome-web-store/v/fifncokofckhanlhmdacdnkbempmopbo.svg)](" + vsmmWebstoreUrl +")";
    }

    public GetChromeWebstoreUsers(hostedRepoName: string) {
        return "[![Chrome webstore users](https://img.shields.io/chrome-web-store/users/fifncokofckhanlhmdacdnkbempmopbo.svg)](" + vsmmWebstoreUrl + ")";
    }

    public GetChromeWebstoreRating(hostedRepoName: string) {
        return "[![Chrome webstore rating](https://img.shields.io/chrome-web-store/rating/fifncokofckhanlhmdacdnkbempmopbo.svg)](" + vsmmWebstoreUrl + "/reviews)";
    }
}

const vsmmWebstoreUrl = "https://chrome.google.com/webstore/detail/visual-studio-marketplace/fifncokofckhanlhmdacdnkbempmopbo";
