import { IRepoMetaData } from "./IRepoMetaData";
import * as myRepos from "./Repos";

export class AllRepoMeta {
    public repoMetaDatas: IRepoMetaData[];

    constructor() {
        this.repoMetaDatas = [
            myRepos.autoFindReplace,
            myRepos.badgesPlayground,
            myRepos.dotNetFlags,
            myRepos.filesForEveryExtensionCreator,
            myRepos.openInAppLauncher,
            myRepos.quickLaunchButtons,
            myRepos.quizLauncher,
            myRepos.solutionOpenPopUp,
            myRepos.trivialApisForIDE,
            myRepos.visualStudioMarketplaceMetrics,
            myRepos.vsixFootie,
            myRepos.vsixRatingChaser,
            myRepos.vsixTwitterWidget,
            myRepos.vstsDashboardWidgetProjectTemplate,
        ];
    }
}
