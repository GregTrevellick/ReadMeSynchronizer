import { RepoCategory } from "./RepoCategory";

export interface IRepoMetaData {
    appVeyorId : string;
    azureDefinitionId: string;
    codacyId: string;
    inspecodeId: string;
    localRepoName: string;
    repoCategory: RepoCategory;
}
