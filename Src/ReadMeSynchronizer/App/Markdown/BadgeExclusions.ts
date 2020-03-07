import { RepoNames } from "./RepoNames";

export class BadgeExclusions {

    public appveyor: RepoNames[] = [
        RepoNames.AllBadges,
        RepoNames.zAngularBasic,
        RepoNames.awib,
        RepoNames.BrowserExtensionUsingAngularWorksInChromeNotInEdge,
        RepoNames["Menees.VsTools.2017"],
        RepoNames.MiscellaneousArtefacts,
        RepoNames.More,
    ];

    public azurePipeline: RepoNames[] = [
        RepoNames.AllBadges,
        RepoNames.zAngularBasic,
        RepoNames.awib,
        RepoNames.BrowserExtensionUsingAngularWorksInChromeNotInEdge,
        RepoNames["Menees.VsTools.2017"],
        RepoNames.MiscellaneousArtefacts,
        RepoNames.More,
        RepoNames.OpenCoverExample,
        RepoNames.VstsDashboardWidgetProjectTemplate,
    ];

    public bettercodehub: RepoNames[] = [
        RepoNames.More,
    ];

    public codacy: RepoNames[] = [
    ];

    public codebeat: RepoNames[] = [
        RepoNames.AllBadges,
        RepoNames.AutoFindReplace,
        RepoNames.DotNetFlags,
        RepoNames.FilesForEveryExtensionCreator,
        RepoNames["Gregt.sidewafflev2"],
        RepoNames.HelloWorldBlazor,
        RepoNames.HelloWorldVsixCommandButton,
        RepoNames.HelloWorldVsixPopUp,
        RepoNames.HelloWorldVsixToolBar,
        RepoNames.HelloWorldVsixToolWindowAsyncPackageExample,
        RepoNames.HelloWorldVstsExtension,
        RepoNames.HelloWorldWpfAsyncBindingPropertyExample,
        RepoNames["Menees.VsTools.2017"],
        RepoNames.MiscellaneousArtefacts,
        RepoNames.More,
        RepoNames.QuickLaunchButtons,
        RepoNames["Quiz.Launcher"],
        RepoNames.SolutionOpenPopUp,
        RepoNames.TrivialApisForIDE,
        RepoNames.VsixBlazorMinimalProjectTemplate,
        RepoNames.VsixDotNetCorePoc,
        RepoNames.VsixFootball,
        RepoNames.VsixRatingChaser,
    ];

    public codefactor: RepoNames[] = [
        RepoNames.zAngularBasic,
        RepoNames.HelloWorldBlazor,
        RepoNames.VsixDotNetCorePoc,
    ];

    public gitHub: RepoNames[] = [
    ];

    //public inspecode: RepoNames[] = [
    //    RepoNames.awib,
    //    RepoNames.MiscellaneousArtefacts,
    //    RepoNames.More,
    //];

    public lgtm: RepoNames[] = [
        RepoNames.AutoFindReplace,//matt jeanes
        RepoNames.awib,
        RepoNames.DotNetFlags,
        RepoNames.FilesForEveryExtensionCreator,
        RepoNames["Gregt.sidewafflev2"],
        RepoNames.HelloWorldTypescriptParcel,//lgtm doesn't support forks
        RepoNames.HelloWorldVsixCommandButton,
        RepoNames.HelloWorldVsixPopUp,
        RepoNames.HelloWorldVsixToolWindowAsyncPackageExample,
        RepoNames.HelloWorldWpfAsyncBindingPropertyExample,
        RepoNames.MiscellaneousArtefacts,
        RepoNames["Menees.VsTools.2017"],
        RepoNames.More,
        RepoNames.OpenCoverExample,
        RepoNames.QuickLaunchButtons,
        RepoNames["Quiz.Launcher"],
        RepoNames.RenameProjectVsExtension,
        RepoNames.SolutionOpenPopUp,
        RepoNames.TrivialApisForIDE,
        RepoNames.VsixDotNetCorePoc,
        RepoNames.VsixFootball,
        RepoNames.VsixFootie,
        RepoNames.VsixRatingChaser,
    ];

    public sonar: RepoNames[] = [
        RepoNames.AllBadges,
        RepoNames.zAngularBasic,
        RepoNames.awib,
        RepoNames.BrowserExtensionUsingAngularWorksInChromeNotInEdge,
        RepoNames["Menees.VsTools.2017"],
        RepoNames.MiscellaneousArtefacts,
        RepoNames.More,
    ];
}
