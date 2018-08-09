export class RepoNames {

    constructor() { }

    public GetRepoNames() {
        const chromeExtensions = Object.keys(ChromeExtensions);
        const miscellaneousRepos = Object.keys(MiscellaneousRepos);
        const nugetPackages = Object.keys(NugetPackages);
        const vstsExtensions = Object.keys(VstsExtensions);
        const vsIdeExtensions = Object.keys(VsIdeExtensions);
        const vsixHelloWorlds = Object.keys(VsixHelloWorlds);
        var allRepoNames = chromeExtensions.concat(miscellaneousRepos, nugetPackages, vstsExtensions, vsIdeExtensions, vsixHelloWorlds);
        return allRepoNames;
    }
}

export enum ChromeExtensions {
    VisualStudioMarketplaceMetrics = "VisualStudioMarketplaceMetrics",
}

export enum MiscellaneousRepos {
    BadgesPlayground = "Badges-playground",
    FilesForEveryExtensionCreator = "FilesForEveryExtensionCreator",
}

export enum NugetPackages {
    DotNetFlags = "DotNetFlags",
    VsixRatingChaser = "VsixRatingChaser",
}

export enum VstsExtensions {
    VsixTwitterWidget = "VsixTwitterWidget",
}

export enum VsIdeExtensions {
    AutoFindReplace = "AutoFindReplace",
    OpenInAppLauncher = "OpenInApp.Launcher",
    QuickLaunchButtons = "QuickLaunchButtons",
    QuizLauncher = "Quiz.Launcher",
    SolutionOpenPopUp = "SolutionOpenPopUp",
    TrivialApisForIDE = "TrivialApisForIDE",
    VsixFootie = "VsixFootie",
    VstsDashboardWidgetProjectTemplate = "VstsDashboardWidgetProjectTemplate",
}

export enum VsixHelloWorlds {
    HelloWorldVstsExtension = "HelloWorldVstsExtension",
    VsixHelloWorldCommandButton = "VsixHelloWorldCommandButton",
    VsixHelloWorldPopUp = "VsixHelloWorldPopUp",
    VsixHelloWorldToolBar = "VsixHelloWorldToolBar",
    VsixToolWindowAsyncPackageExample = "VsixToolWindowAsyncPackageExample",
    WpfAsyncBindingPropertyExample = "WpfAsyncBindingPropertyExample",
}
