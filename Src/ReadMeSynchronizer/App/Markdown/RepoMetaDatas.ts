import { IRepoMetaData } from "./IRepoMetaData";
import * as myRepos from "./Repos";

export class RepoMetaDatas {
    public repoMetaDatas: IRepoMetaData[];

    constructor() {

        //TODO: sort by category then name

        this.repoMetaDatas = [

            //special
            myRepos.allBadges,

            //chrome
            myRepos.visualStudioMarketplaceMetrics,

            //misc
            myRepos.filesForEveryExtensionCreator,
            myRepos.gregtSideWaffleV2,

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
        ];

    }
}
