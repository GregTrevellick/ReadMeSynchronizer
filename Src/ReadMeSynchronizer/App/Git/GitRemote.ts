import { AllRepoMeta } from "../UpdateReadmeFiles/AllRepoMeta";
import { GitCommand } from "./GitCommand";

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
            const simpleGit = require('simple-git');//////////////////////(workingDirPath);//('../../../VsixFootie');

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
                    break;
                }
                case GitCommand.UndoReadMe: {
                    //git --git-dir=../VsixFootie/.git --work-tree=../VsixFootie checkout -- README.md
                    const checkoutReadMeCommand = "git --git-dir=" + workingDirPath + "/.git --work-tree=" + workingDirPath + " checkout  -- README.md";
                    var exec = require('child_process').exec;
                    exec(checkoutReadMeCommand);
                    break;
                }
                default: {
                    //error
                    break;
                }
            }
        }
    }
}
