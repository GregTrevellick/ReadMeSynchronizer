import { AllRepoMeta } from "../UpdateReadmeFiles/AllRepoMeta";
import { GitCommand } from "./GitCommand";

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
                    //push
                    //simpleGit(workingDirPath).push(commitMessage, specificTargetFile)
                    break;
                }
                case GitCommand.UndoReadMe: {
                    //simpleGit(workingDirPath).revert('HEAD~1', { '--no-rebase': null })
                    //git checkout -- README.md
                    simpleGit(workingDirPath).checkout("-- README.md");
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
