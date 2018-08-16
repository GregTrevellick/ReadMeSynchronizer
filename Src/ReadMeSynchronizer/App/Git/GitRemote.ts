import { AllRepoMeta } from "../UpdateReadmeFiles/AllRepoMeta";
import { GitCommand } from "./GitCommand";

export class GitCommit {

    private targetReadMeFileName = "README.md";
    private allRepoMeta: AllRepoMeta;

    constructor() {
        this.allRepoMeta = new AllRepoMeta;
    }

    public GitExe(gitCommand: GitCommand) {

        const commitMessage = `ReadMeSynchronizer_${gitCommand}`;
        const simpleGit = require('simple-git');//require('simple-git')(workingDirPath);

        for (const repoMetaData of this.allRepoMeta.repoMetaDatas) {

            //gregt extract below to equiv of "FileSystemUpdater.ts"

            const workingDirPath: string = "../../../" + repoMetaData.localRepoName;

            switch (gitCommand) {
                //case GitCommand.CleanRepo: {
                //    break;
                //}
                case GitCommand.CommitReadMe: {
                    simpleGit(workingDirPath).commit(commitMessage, this.targetReadMeFileName)
                    break;
                }
                //case GitCommand.FetchRepo: {
                //    break;
                //}
                case GitCommand.PullRepo: {
                    simpleGit(workingDirPath).pull("origin", "master");
                    break;
                }
                case GitCommand.PushReadMe: {
                    this.RunGitCommandForReadMeFile(workingDirPath, "push");
                    break;
                }
                case GitCommand.UndoReadMe: {
                    this.RunGitCommandForReadMeFile(workingDirPath, "checkout");
                    break;
                }
                default: {
                    //TODO: error scenario
                    break;
                }
            }
        }
    }

    private RunGitCommandForReadMeFile(workingDirPath: string, gitCommand: string) {
        const gitCommandExec = "git --git-dir=" + workingDirPath + "/.git --work-tree=" + workingDirPath + " " + gitCommand + " -- " + this.targetReadMeFileName;
        //e.g. "git --git-dir=../../../VsixFootie/.git --work-tree=../../../VsixFootie checkout -- README.md"
        var exec = require('child_process').exec;
        exec(gitCommandExec);
    }
}
