import { IRepoMetaData } from "./IRepoMetaData";
import * as myRepos from "./Repos";

export class AllRepoMeta {
    public repoMetaDatas: IRepoMetaData[];

    constructor() {
        this.repoMetaDatas = [
            myRepos.badgesPlayground,
            myRepos.dotNetFlags,
            myRepos.oia,
            myRepos.vsixRatingChaser,
            myRepos.vsmm,
        ];
    }
}

