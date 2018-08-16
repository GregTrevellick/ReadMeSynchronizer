import { RepoMetaDatas } from "../UpdateReadmeFiles/RepoMetaDatas";
import { GitCommand } from "./GitCommand";
import { RepoCategory } from "../UpdateReadmeFiles/RepoCategory";

export class GitCommit {

    private targetReadMeFileName = "README.md";
    private repoMetaDatas: RepoMetaDatas;

    constructor() {
        this.repoMetaDatas = new RepoMetaDatas;
    }

    public GitExe(gitCommand: GitCommand) {

        const commitMessage = `ReadMeSynchronizer_${gitCommand}`;
        const simpleGit = require('simple-git');//require('simple-git')(workingDirPath);

        for (const repoMetaData of this.repoMetaDatas.repoMetaDatas) {

            if (repoMetaData.repoCategory != RepoCategory.SpecialRepo) {

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
                        console.log(workingDirPath);
                        simpleGit(workingDirPath).pull("origin", "master");
                        break;
                    }
                    case GitCommand.PushRepo: {
                        this.RunGitCommand(workingDirPath, "push origin master");
                        break;
                    }
                    case GitCommand.UndoReadMe: {
                        this.RunGitCommand(workingDirPath, "checkout -- " + this.targetReadMeFileName);
                        break;
                    }
                    default: {
                        //TODO: error scenario
                        break;
                    }
                }
            }
        }
    }

    private RunGitCommand(workingDirPath: string, gitCommand: string) {
        const gitCommandExec = "git --git-dir=" + workingDirPath + "/.git --work-tree=" + workingDirPath + " " + gitCommand;
        //e.g. "git --git-dir=../../../VsixFootie/.git --work-tree=../../../VsixFootie checkout -- README.md"
        //e.g. "git --git-dir=../../../VsixFootie/.git --work-tree=../../../VsixFootie push origin master"
        var exec = require('child_process').exec;
        exec(gitCommandExec);
    }
}
