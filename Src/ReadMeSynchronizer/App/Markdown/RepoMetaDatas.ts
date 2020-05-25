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
            //myRepos.awib,//error "Cannot use simple-git on a directory that does not exist"
            myRepos.azureDevOpsAgileManifestoWidget,
            myRepos.azureDevOpsBlazorRadiator,
            //myRepos.azureDevOpsRotaWidget,
            //myRepos.browserExtensionUsingAngularWorksInChromeNotInEdge,//error "Cannot use simple-git on a directory that does not exist"
            myRepos.cleanArchitecture,
            myRepos.dotNetFlags,
            myRepos.filesForEveryExtensionCreator,
            myRepos.gregtSideWaffleV2,
            //myRepos.helloWorldBlazor,//now prefixed with Z in git
            myRepos.helloWorldTypescriptParcel,
            myRepos.helloWorldTypescriptWebpack,
            myRepos.helloWorldVsixCommandButton,
            myRepos.helloWorldVsixPopUp,
            myRepos.helloWorldVsixToolBar,
            myRepos.helloWorldVsixToolWindowAsyncPackageExample,
            myRepos.helloWorldVstsExtension,
            myRepos.helloWorldWpfAsyncBindingPropertyExample,
            //myRepos.meneesVsTools2017,//error "Cannot use simple-git on a directory that does not exist"
            myRepos.miscellaneousArtefacts,
            myRepos.more,
            //myRepos.openCoverExample,//error "Cannot use simple-git on a directory that does not exist"
            myRepos.openInAppLauncher,
            myRepos.quickLaunchButtons,
            myRepos.quizLauncher,
            myRepos.readMeSynchronizer,
            //myRepos.renameProjectVsExtension,//error "Cannot use simple-git on a directory that does not exist"
            myRepos.solutionOpenPopUp,
            myRepos.trivialApisForIDE,
            myRepos.visualStudioMarketplaceMetrics,
            myRepos.vsixBlazorMinimalProjectTemplate,
            //myRepos.vsixDotNetCorePoc, //now prefixed with Z in git
            myRepos.vsixFootball,
            //myRepos.vsixFootie,//archived in github
            myRepos.vsixItemTemplateSqlScriptAgentJob,
            myRepos.vsixItemTemplateSqlScriptFunction,
            myRepos.vsixItemTemplateSqlScriptSchema,
            myRepos.vsixItemTemplateSqlScriptStoredProcedure,
            myRepos.vsixItemTemplateSqlScriptSynonym,
            myRepos.vsixItemTemplateSqlScriptTable,
            myRepos.vsixItemTemplateSqlScriptView,
            myRepos.vsixNewYeomanProject,
            myRepos.vsixRatingChaser,
            myRepos.vsixTwitterWidget,
            myRepos.vsixYeomanTemplates,
            myRepos.vstsDashboardWidgetProjectTemplate,

        ];

    }
}
