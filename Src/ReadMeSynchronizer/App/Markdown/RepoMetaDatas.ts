import { IRepoMetaData } from "./IRepoMetaData";
import * as myRepos from "./Repos";

export class RepoMetaDatas {
    public repoMetaDatas: IRepoMetaData[];

    constructor() {

        //DO NOT ALPHA SORT THESE - THIS IS UI SEQUENCE (rubbish I know!)

        this.repoMetaDatas = [

            //special
            myRepos.allBadges,

            //chrome
            myRepos.visualStudioMarketplaceMetrics,

            //misc
            myRepos.browserExtensionUsingAngularWorksInChromeNotInEdge,
            myRepos.filesForEveryExtensionCreator,
            myRepos.miscellaneousArtefacts,
            myRepos.more,

            //nuget
            myRepos.dotNetFlags,
            myRepos.vsixRatingChaser,

            //readMeSynchronizer
            myRepos.readMeSynchronizer,

            //vsts extensions
            myRepos.azureDevOpsRotaWidget,
            myRepos.vsixTwitterWidget,

            //vsix ide
            myRepos.autoFindReplace,
            myRepos.openInAppLauncher,
            myRepos.quickLaunchButtons,
            myRepos.quizLauncher,
            myRepos.solutionOpenPopUp,
            myRepos.trivialApisForIDE,
            myRepos.vsixBlazorMinimalProjectTemplate,
            myRepos.vsixFootball,
            myRepos.vsixFootie,
            myRepos.vstsDashboardWidgetProjectTemplate,

            //forks
            myRepos.angularBasic,
            myRepos.awib,
            myRepos.gregtSideWaffleV2,
            myRepos.meneesVsTools2017,
            myRepos.openCoverExample,
            myRepos.renameProjectVsExtension,

            //hello world
            myRepos.helloWorldBlazor,
            myRepos.helloWorldTypescriptParcel,
            myRepos.helloWorldTypescriptWebpack,
            myRepos.helloWorldVsixPopUp,
            myRepos.helloWorldVsixToolBar,
            myRepos.helloWorldVsixToolWindowAsyncPackageExample,
            myRepos.helloWorldVstsExtension,
            myRepos.helloWorldWpfAsyncBindingPropertyExample,
            myRepos.vsixDotNetCorePoc,

        ];

    }
}
