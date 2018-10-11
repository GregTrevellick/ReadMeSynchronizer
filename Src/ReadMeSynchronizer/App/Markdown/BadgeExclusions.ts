import { RepoNames } from "./RepoNames";

export class BadgeExclusions {

    public appveyor: RepoNames[] = [
        RepoNames.AllBadges,
        RepoNames.AngularBasic,
        RepoNames.awib,
        RepoNames.BrowserExtensionUsingAngularWorksInChromeNotInEdge,
        RepoNames["Menees.VsTools.2017"],
        RepoNames.MiscellaneousArtefacts,
        RepoNames.More,
    ];

    public azurePipeline: RepoNames[] = [
        RepoNames.AllBadges,
        RepoNames.AngularBasic,
        RepoNames.awib,
        RepoNames.BrowserExtensionUsingAngularWorksInChromeNotInEdge,
        //RepoNames.HelloWorldTypescriptParcel,
        RepoNames["Menees.VsTools.2017"],
        RepoNames.MiscellaneousArtefacts,
        RepoNames.More,
        RepoNames.OpenCoverExample,
        RepoNames.VstsDashboardWidgetProjectTemplate,
    ];

    //Sonar - essentially same list as appVeyor as appVeyor kicks off sonar
    public sonar: RepoNames[] = [
        RepoNames.AllBadges,
        RepoNames.AngularBasic,
        RepoNames.awib,
        RepoNames.BrowserExtensionUsingAngularWorksInChromeNotInEdge,
        RepoNames["Menees.VsTools.2017"],
        RepoNames.MiscellaneousArtefacts,
        RepoNames.More,
    ];

    //betterCodeHubCompliance
    //codacyBadge
    //codeFactor
    //gitHub
    //sonar
}
