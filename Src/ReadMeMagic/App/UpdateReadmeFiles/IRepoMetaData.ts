import { RepoCategory } from "./RepoCategory";

export interface IRepoMetaData {
    hostedRepoName: string;
    localRepoName: string;
    codacyId: string;
    repoCategory: RepoCategory;
}
