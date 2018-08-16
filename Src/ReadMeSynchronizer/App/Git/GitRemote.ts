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
        const simpleGit = require('simple-git');//require('simple-git')(workingDirPath);

        for (const repoMetaData of this.allRepoMeta.repoMetaDatas) {

            //gregt extract below to equiv of "FileSystemUpdater.ts"

            const workingDirPath: string = "../../../" + repoMetaData.localRepoName;

            switch (gitCommand) {
                //case GitCommand.CleanRepo: {
                //    break;
                //}
                case GitCommand.CommitReadMe: {
                    simpleGit(workingDirPath).commit(commitMessage, specificTargetFile)
                    break;
                }
                //case GitCommand.FetchRepo: {
                //    break;
                //}
                case GitCommand.PullRepo: {
                    console.log(workingDirPath);
                    simpleGit(workingDirPath).pull('origin', 'master');
                    break;
                }
                case GitCommand.PushReadMe: {
                    const checkoutReadMeCommand = "git --git-dir=" + workingDirPath + "/.git --work-tree=" + workingDirPath + " push  -- README.md";
                    var exec = require('child_process').exec;
                    exec(checkoutReadMeCommand);
                    break;
                }
                case GitCommand.UndoReadMe: {
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
