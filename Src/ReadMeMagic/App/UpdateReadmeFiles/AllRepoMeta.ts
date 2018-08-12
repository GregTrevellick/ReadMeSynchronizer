import { IRepoMetaData } from "./IRepoMetaData";
import * as myRepos from "./Repos";

export class AllRepoMeta {
    public repoMetaDatas: IRepoMetaData[];

    constructor() {

        //TODO: sort by category then name

        this.repoMetaDatas = [

            //special
            myRepos.badgesPlayground,

            //vsix ide
            myRepos.autoFindReplace,
            myRepos.openInAppLauncher,
            myRepos.quickLaunchButtons,
            myRepos.quizLauncher,
            myRepos.solutionOpenPopUp,
            myRepos.trivialApisForIDE,
            myRepos.vsixFootie,
            myRepos.vsixTwitterWidget,
            myRepos.vstsDashboardWidgetProjectTemplate,

            //nuget
            myRepos.dotNetFlags,
            myRepos.filesForEveryExtensionCreator,
            myRepos.vsixRatingChaser,

            //chrome
            myRepos.visualStudioMarketplaceMetrics,
        ];

    }
}
