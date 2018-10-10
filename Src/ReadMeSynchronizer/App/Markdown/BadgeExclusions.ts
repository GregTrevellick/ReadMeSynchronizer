import { RepoNames } from "./RepoNames";

export class BadgeExclusions {

    public appveyor: RepoNames[] = [
        //RepoNames.AllBadges,
        RepoNames.awib,
        RepoNames.MiscellaneousArtefacts,
        RepoNames.More,
    ];

    public azurePipeline: RepoNames[] = [
        //RepoNames.AllBadges,
        RepoNames.awib,
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
