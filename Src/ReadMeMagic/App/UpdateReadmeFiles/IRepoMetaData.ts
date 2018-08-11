import { RepoCategory } from "./RepoCategory";

export interface IRepoMetaData {
    hostedRepoName: string;
    localRepoName: string;
    //isChromeExtension: boolean;
    //isMiscellaneousRepo: boolean;
    //isNugetPackage: boolean;
    //isSpecialRepo: boolean;
    //isVsIdeExtension: boolean;
    //isVsixHelloWorld: boolean;
    //isVstsExtension: boolean;
    codacyId: string;
    repoCategory: RepoCategory;
}
