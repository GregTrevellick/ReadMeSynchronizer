import { IRepoMetaData } from "./IRepoMetaData";
import * as myRepos from "./Repos";

export class RepoMetaDatas {
    public repoMetaDatas: IRepoMetaData[];

    constructor() {

        // UI sequence of bottom half of AllBadges repo ReadMe file

        this.repoMetaDatas = [

            myRepos.allBadges,
            //myRepos.angularBasic, //superceded by VsixYeomanTemplates
            myRepos.autoFindReplace,
            myRepos.awib,
            myRepos.azureDevOpsAgileManifestoWidget,
            myRepos.azureDevOpsBlazorRadiator,
            //myRepos.azureDevOpsRotaWidget,
            myRepos.browserExtensionUsingAngularWorksInChromeNotInEdge,
            myRepos.cleanArchitecture,
            myRepos.dotNetFlags,
            myRepos.filesForEveryExtensionCreator,
            myRepos.gregtSideWaffleV2,
            myRepos.helloWorldBlazor,
            myRepos.helloWorldTypescriptParcel,
            myRepos.helloWorldTypescriptWebpack,
            myRepos.helloWorldVsixCommandButton,
            myRepos.helloWorldVsixPopUp,
            myRepos.helloWorldVsixToolBar,
            myRepos.helloWorldVsixToolWindowAsyncPackageExample,
            myRepos.helloWorldVstsExtension,
            myRepos.helloWorldWpfAsyncBindingPropertyExample,
            myRepos.meneesVsTools2017,
            myRepos.miscellaneousArtefacts,
            myRepos.more,
            myRepos.openCoverExample,
            myRepos.openInAppLauncher,
            myRepos.quickLaunchButtons,
            myRepos.quizLauncher,
            myRepos.readMeSynchronizer,
            myRepos.renameProjectVsExtension,
            myRepos.solutionOpenPopUp,
            myRepos.trivialApisForIDE,
            myRepos.visualStudioMarketplaceMetrics,
            myRepos.vsixBlazorMinimalProjectTemplate,
            myRepos.vsixDotNetCorePoc,
            myRepos.vsixFootball,
            myRepos.vsixFootie,
            myRepos.vsixNewYeomanProject,
            myRepos.vsixRatingChaser,
            myRepos.vsixTwitterWidget,
            myRepos.vsixYeomanTemplates,
            myRepos.vstsDashboardWidgetProjectTemplate,

        ];

    }
}
