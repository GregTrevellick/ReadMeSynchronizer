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
        RepoNames["Menees.VsTools.2017"],
        RepoNames.MiscellaneousArtefacts,
        RepoNames.More,
        RepoNames.OpenCoverExample,
    ];

    //betterCodeHubCompliance
    //codacyBadge
    //codeFactor
    //gitHub
    //sonar
}
