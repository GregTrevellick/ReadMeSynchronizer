import { RepoNames } from "./RepoNames";

export class BadgeExclusions {

    public appveyor: RepoNames[] = [
        RepoNames.More,
        RepoNames.MiscellaneousArtefacts
    ];

    public azurePipeline: RepoNames[] = [
        RepoNames.awib,
        RepoNames["Menees.VsTools.2017"]
    ];

    //betterCodeHubCompliance
    //codacyBadge
    //codeFactor
    //gitHub
    //sonar
}
