export class MarkdownProvider {

    constructor() { }

    public GetLicenceBadgeMarkdown() {
        return "[![License](https://img.shields.io/github/license/gittools/gitlink.svg)](/LICENSE.txt)";
    }

    public GetAccessLintBadgeMarkdown() {
        return "[![Access Lint github](https://img.shields.io/badge/a11y-checked-green.svg)](https://www.accesslint.com)";
    }

    public GetGitHubTopLanguage(repoFolderName: string) {
        return "[![GitHub top language](https://img.shields.io/github/languages/top/GregTrevellick/OpenInApp.Launcher.svg)](" + this.GetGitHubUrlForRepo(repoFolderName) + ")";
    }

    public GetGitHubLanguageCount(repoFolderName: string) {
        return "[![Github language count](https://img.shields.io/github/languages/count/GregTrevellick/OpenInApp.Launcher.svg)](" + this.GetGitHubUrlForRepo(repoFolderName) + ")";
    }

    public GetGitHubPullRequests(repoFolderName: string) {
        return "[![GitHub pull requests](https://img.shields.io/github/issues-pr-raw/GregTrevellick/OpenInApp.Launcher.svg)](" + this.GetGitHubUrlForRepo(repoFolderName) + ")";
    }

    private GetGitHubUrlForRepo(repoFolderName: string) {
        return "https://github.com/GregTrevellick/" + repoFolderName;
    }

    public GetBetterCodeHubCompliance(repoFolderName: string) {
        return "[![BetterCodeHub compliance](https://bettercodehub.com/edge/badge/GregTrevellick/OpenInApp.Launcher?branch=master)](https://bettercodehub.com/results/GregTrevellick/OpenInApp.Launcher)";
    }

    public GetCodacyBadge(repoFolderName: string) {
        return "[![Codacy Badge](https://api.codacy.com/project/badge/Grade/e0cb8a23f42c4859aeb5c653b1a3d2b6)](https://www.codacy.com/project/gtrevellick/OpenInApp.Launcher/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=GregTrevellick/OpenInApp.Launcher&amp;utm_campaign=Badge_Grade_Dashboard)";
    }

    public GetCodeCov(repoFolderName: string) {
        return "[![codecov](https://codecov.io/gh/GregTrevellick/OpenInApp.Launcher/branch/master/graph/badge.svg)](https://codecov.io/gh/GregTrevellick/OpenInApp.Launcher)";
    }

    public GetCodeFactor(repoFolderName: string) {
        return "[![CodeFactor](https://www.codefactor.io/repository/github/gregtrevellick/OpenInApp.Launcher/badge)](https://www.codefactor.io/repository/github/gregtrevellick/OpenInApp.Launcher)";
    }

    public GetAppveyorBuildStatus(repoFolderName: string) {
        return "[![Appveyor Build status](https://ci.appveyor.com/api/projects/status/0vwmtcboontemltq?svg=true)](https://ci.appveyor.com/project/GregTrevellick/openinapp-launcher)";
    }

    public GetAppveyorUnitTests(repoFolderName: string) {
        return "[![Appveyor unit tests](https://img.shields.io/appveyor/tests/GregTrevellick/OpenInApp-Launcher.svg)](https://ci.appveyor.com/project/GregTrevellick/OpenInApp-Launcher/build/tests)";
    }

    public GetTravisBuildStatus(repoFolderName: string) {
        return "[![Travis Build Status](https://travis-ci.org/GregTrevellick/OpenInApp.Launcher.svg?branch=master)](https://travis-ci.org/GregTrevellick/OpenInApp.Launcher)";
    }

    public GetImgBot(repoFolderName: string) {
        return "[![ImgBot](https://img.shields.io/badge/images-optimized-green.svg)](https://imgbot.net/)";
    }

    public GetCharityWare(repoFolderName: string) {
        return "[![Charity Ware](https://img.shields.io/badge/charity%20ware-thank%20you-brightgreen.svg)](https://github.com/GregTrevellick/MiscellaneousArtefacts/wiki/Charity-Ware)";
    }

    public GetAccessLintSocial(repoFolderName: string) {
        return "[![Access Lint social](https://img.shields.io/badge/a11y-accesslint-green.svg?style=social&label=a11y)](https://twitter.com/accesslint)";
    }

    public GetVisualStudioMarketplaceVSTSVersion(repoFolderName: string) {
        return "[![Visual Studio Marketplace version](https://img.shields.io/vscode-marketplace/v/GregTrevellick.vsts-extensions-tweets-Dev-Humor.svg)](https://marketplace.visualstudio.com/items?itemName=GregTrevellick.vsts-extensions-tweets-Dev-Humor)";
    }

    public GetVisualStudioMarketplaceVSTSDownloads(repoFolderName: string) {
        return "[![Visual Studio Marketplace downloads](https://img.shields.io/vscode-marketplace/d/GregTrevellick.vsts-extensions-tweets-Dev-Humor.svg)](https://marketplace.visualstudio.com/items?itemName=GregTrevellick.vsts-extensions-tweets-Dev-Humor)";
    }

    public GetVisualStudioMarketplaceVSTSRatings(repoFolderName: string) {
        return "[![Visual Studio Marketplace ratings](https://img.shields.io/vscode-marketplace/r/GregTrevellick.vsts-extensions-tweets-Dev-Humor.svg)](https://marketplace.visualstudio.com/items?itemName=GregTrevellick.vsts-extensions-tweets-Dev-Humor#review-details)";
    }

    public GetVisualStudioMarketplaceIDEVersion(repoFolderName: string) {
        return "[![Visual Studio Marketplace version](https://vsmarketplacebadge.apphb.com/version/GregTrevellick.OpenInApp.Launcher.svg)](https://marketplace.visualstudio.com/items?itemName=GregTrevellick.OpenInApp.Launcher)";
    }

    public GetVisualStudioMarketplaceIDEDownloads(repoFolderName: string) {
        return "[![Visual Studio Marketplace downloads](https://vsmarketplacebadge.apphb.com/installs/GregTrevellick.OpenInApp.Launcher.svg)](https://marketplace.visualstudio.com/items?itemName=GregTrevellick.OpenInApp.Launcher)";
    }

    public GetVisualStudioMarketplaceIDERatings(repoFolderName: string) {
        return "[![Visual Studio Marketplace ratings](https://vsmarketplacebadge.apphb.com/rating/GregTrevellick.OpenInApp.Launcher.svg)](https://marketplace.visualstudio.com/items?itemName=GregTrevellick.OpenInApp.Launcher)";
    }

    public GetNugetDownloads(repoFolderName: string) {
        return "[![Nuget downloads](https://img.shields.io/nuget/dt/DotNetFlags.svg)](https://www.nuget.org/packages/DotNetFlags/)";
    }

    public GetChromeWebstoreVersion(repoFolderName: string) {
        return "[![Chrome webstore version](https://img.shields.io/chrome-web-store/v/fifncokofckhanlhmdacdnkbempmopbo.svg)](https://chrome.google.com/webstore/detail/visual-studio-marketplace/fifncokofckhanlhmdacdnkbempmopbo)";
    }

    public GetChromeWebstoreUsers(repoFolderName: string) {
        return "[![Chrome webstore users](https://img.shields.io/chrome-web-store/users/fifncokofckhanlhmdacdnkbempmopbo.svg)](https://chrome.google.com/webstore/detail/visual-studio-marketplace/fifncokofckhanlhmdacdnkbempmopbo)";
    }

    public GetChromeWebstoreRating(repoFolderName: string) {
        return "[![Chrome webstore rating](https://img.shields.io/chrome-web-store/rating/fifncokofckhanlhmdacdnkbempmopbo.svg)](https://chrome.google.com/webstore/detail/visual-studio-marketplace/fifncokofckhanlhmdacdnkbempmopbo/reviews)";
    }
}
