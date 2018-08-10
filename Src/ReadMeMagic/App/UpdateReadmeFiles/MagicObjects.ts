export interface IRepoMeta {
    appNickName: string;
    repoRemoteName: string;
    repoLocalDiscName: string;
    isChromeExtension: boolean;
    isMiscellaneousRepo: boolean;
    isNugetPackage: boolean;
    isSpecialRepo: boolean;
    isVsIdeExtension: boolean;
    isVsixHelloWorld: boolean;
    isVstsExtension: boolean;
}

const vsmm: IRepoMeta = {
    appNickName: 'VisualStudioMarketplaceMetrics',
    repoRemoteName: 'VisualStudioMarketplaceMetrics',
    repoLocalDiscName: 'VisualStudioMarketplaceMetrics',
    isChromeExtension: true,
    isMiscellaneousRepo: false,
    isNugetPackage: false,
    isSpecialRepo: false,
    isVsIdeExtension: false,
    isVsixHelloWorld: false,
    isVstsExtension: false
};

const dotNetFlags: IRepoMeta = {
    appNickName: 'DotNetFlags',
    repoRemoteName: 'DotNetFlags',
    repoLocalDiscName: 'DotNetFlags',
    isChromeExtension: false,
    isMiscellaneousRepo: false,
    isNugetPackage: true,
    isSpecialRepo: false,
    isVsIdeExtension: false,
    isVsixHelloWorld: false,
    isVstsExtension: false
};

const vsixRatingChaser: IRepoMeta = {
    appNickName: 'VsixRatingChaser',
    repoRemoteName: 'VsixRatingChaser',
    repoLocalDiscName: 'VsixRatingChaser',
    isChromeExtension: false,
    isMiscellaneousRepo: false,
    isNugetPackage: true,
    isSpecialRepo: false,
    isVsIdeExtension: false,
    isVsixHelloWorld: false,
    isVstsExtension: false
};

const badgesPlayground: IRepoMeta = {
    appNickName: 'BadgesPlayground',
    repoRemoteName: 'Badges-playground',
    repoLocalDiscName: 'Badges-playground',
    isChromeExtension: false,
    isMiscellaneousRepo: false,
    isNugetPackage: false,
    isSpecialRepo: true,
    isVsIdeExtension: false,
    isVsixHelloWorld: false,
    isVstsExtension: false
};

const oia: IRepoMeta = {
    appNickName: 'OpenInAppLauncher',
    repoRemoteName: 'OpenInApp.Launcher',
    repoLocalDiscName: 'OpenInApp.Launcher',
    isChromeExtension: false,
    isMiscellaneousRepo: false,
    isNugetPackage: false,
    isSpecialRepo: true,
    isVsIdeExtension: false,
    isVsixHelloWorld: false,
    isVstsExtension: false
};

export class RepoNames {
    public repoMetas: IRepoMeta[];

    constructor() {
        this.repoMetas = [
            badgesPlayground,
            dotNetFlags,
            vsixRatingChaser,
            vsmm,
            oia
        ];
    }
}

//export enum MiscellaneousRepos {
//    FilesForEveryExtensionCreator = "FilesForEveryExtensionCreator",
//}

//export enum VsIdeExtensions {
//    AutoFindReplace = "AutoFindReplace",
//    QuickLaunchButtons = "QuickLaunchButtons",
//    QuizLauncher = "Quiz.Launcher",
//    SolutionOpenPopUp = "SolutionOpenPopUp",
//    TrivialApisForIDE = "TrivialApisForIDE",
//    VsixFootie = "VsixFootie",
//    VstsDashboardWidgetProjectTemplate = "VstsDashboardWidgetProjectTemplate",
//}

//export enum VsixHelloWorlds {
//    HelloWorldVstsExtension = "HelloWorldVstsExtension",
//    VsixHelloWorldCommandButton = "VsixHelloWorldCommandButton",
//    VsixHelloWorldPopUp = "VsixHelloWorldPopUp",
//    VsixHelloWorldToolBar = "VsixHelloWorldToolBar",
//    VsixToolWindowAsyncPackageExample = "VsixToolWindowAsyncPackageExample",
//    WpfAsyncBindingPropertyExample = "WpfAsyncBindingPropertyExample",
//}

//export enum VstsExtensions {
//    VsixTwitterWidget = "VsixTwitterWidget",
//}
