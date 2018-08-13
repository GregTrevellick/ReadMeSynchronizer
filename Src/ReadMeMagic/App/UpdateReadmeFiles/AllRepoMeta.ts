import { IRepoMetaData } from "./IRepoMetaData";
import * as myRepos from "./Repos";

export class AllRepoMeta {
    public repoMetaDatas: IRepoMetaData[];

    constructor() {

        //TODO: sort by category then name

        this.repoMetaDatas = [

            //special
            myRepos.badges,

            //chrome
            myRepos.visualStudioMarketplaceMetrics,

            //misc
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
