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

}



    //Applicable badges
    //appveyorBuildStatus?: boolean;
    //appveyorUnitTests?: boolean;
    //azurePipelineBuildStatus?: boolean;
    //betterCodeHubCompliance?: boolean;
    //codacyBadge?: boolean;
    //codeFactor?: boolean;
    //gitHubIssues: boolean;
    //gitHubPullRequests?: boolean;
    //sonarBugs?: boolean;
    //sonarCodeSmells?: boolean;
    //sonarCoverage?: boolean;
    //sonarDuplicatedLinesDensity?: boolean;
    //sonarMaintainability?: boolean;
    //sonarNumberOfLinesOfCode?: boolean;
    //sonarQualityGateStatus?: boolean;
    //sonarReliabilityRating?: boolean;
    //sonarSecurityRating?: boolean;
    //sonarTechnicalDebt?: boolean;
    //sonarVulnerabilities?: boolean;