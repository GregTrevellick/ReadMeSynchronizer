import { RepoCategory } from "./RepoCategory";

export interface IRepoMetaData {
    appVeyorId: string;
    codacyId: string;
    localRepoName: string;
    repoCategory: RepoCategory;
}
