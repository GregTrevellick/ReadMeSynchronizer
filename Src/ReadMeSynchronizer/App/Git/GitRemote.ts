import { GitCommand } from "./GitCommand";
import { AllRepoMeta } from "../UpdateReadmeFiles/AllRepoMeta";

const simpleGit = require('simple-git');//('../../../VsixFootie');

export class GitCommit {

    private allRepoMeta: AllRepoMeta;

    constructor() {
        this.allRepoMeta = new AllRepoMeta;
    }

    public GitExe(gitCommand: GitCommand) {

        const commitMessage = `ReadMeSynchronizer_${gitCommand}`;
        const specificTargetFile = 'README.md';

        for (const repoMetaData of this.allRepoMeta.repoMetaDatas) {

            const workingDirPath : string = "../../../" + repoMetaData.localRepoName;

            //gregt extract below to equiv of "FileSystemUpdater.ts"
            switch (gitCommand) {
                case GitCommand.CleanRepo: {
                    //clean
                    break;
                }
                case GitCommand.CommitReadMe: {
                    simpleGit(workingDirPath).commit(commitMessage, specificTargetFile)
                    break;
                }
                case GitCommand.FetchRepo: {
                    //fetch
                    break;
                }
                case GitCommand.PullRepo: {
                    //pull
                    break;
                }
                case GitCommand.PushReadMe: {
                    simpleGit(workingDirPath).push(commitMessage, specificTargetFile)
                    break;
                }
                case GitCommand.RevertReadMe: {
                    //simpleGit(workingDirPath).revert(commitMessage, specificTargetFile)
                    console.error("gfhgfhgfhgf");
                    break;
                }
                default: {
                    //ERROR!!!!
                    break;
                }
            }

        }
    }
}
