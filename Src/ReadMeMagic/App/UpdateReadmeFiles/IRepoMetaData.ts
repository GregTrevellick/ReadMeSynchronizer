import { RepoCategory } from "./RepoCategory";

export interface IRepoMetaData {
    codacyId: string;
    hostedRepoName: string;
    localRepoName: string;
    repoCategory: RepoCategory;
}
