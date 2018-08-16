import { IRepoMetaData } from "./IRepoMetaData";
import * as myRepos from "./Repos";

export class RepoMetaDatas {
    public repoMetaDatas: IRepoMetaData[];

    constructor() {

        //TODO: sort by category then name

        this.repoMetaDatas = [

            //special
            myRepos.readMeSynchronizer,

            //chrome
            myRepos.visualStudioMarketplaceMetrics,

            //misc
            myRepos.badges,
            //myRepos.gitPlayground1,
            //myRepos.gitPlayground2,
            //myRepos.gitPlayground3,
            myRepos.filesForEveryExtensionCreator,

            //nuget
            myRepos.dotNetFlags,
            myRepos.vsixRatingChaser,

            //vsts extensions
            myRepos.vsixTwitterWidget,

            //vsix ide
            myRepos.autoFindReplace,
            myRepos.openInAppLauncher,
            myRepos.quickLaunchButtons,
            myRepos.quizLauncher,
            myRepos.solutionOpenPopUp,
            myRepos.trivialApisForIDE,
            myRepos.vsixFootie,
            myRepos.vstsDashboardWidgetProjectTemplate,

        ];

    }
}
