import { GitCommand } from "./GitCommand";
import { RepoCategory } from "../Markdown/RepoCategory";
import { RepoMetaDatas } from "../Markdown/RepoMetaDatas";

export class GitExecutioner {

    private repoMetaDatas: RepoMetaDatas;

    constructor() {
        this.repoMetaDatas = new RepoMetaDatas;
    }

    public GitExecute(gitCommand: GitCommand) {

        for (const repoMetaData of this.repoMetaDatas.repoMetaDatas) {

            if (repoMetaData.repoCategory != RepoCategory.SpecialRepo) {
                this.GitProcessRepo(repoMetaData.localRepoName, gitCommand);
            }
        }
    }

    private GitProcessRepo(localRepoName: string, gitCommand: GitCommand) {

        const simpleGit = require('simple-git');//require('simple-git')(workingDirPath);
        const targetReadMeFileName = "README.md";
        const workingDirPath: string = "../../../" + localRepoName;

        switch (gitCommand) {
            case GitCommand.CommitReadMe: {
                const commitMessage = `ReadMeSynchronizer_${gitCommand}`;
                simpleGit(workingDirPath).commit(commitMessage, targetReadMeFileName)
                break;
            }
            case GitCommand.PullRepo: {
                simpleGit(workingDirPath).pull("origin", "master");
                break;
            }
            case GitCommand.PushRepo: {
                this.RunGitCommand(workingDirPath, "push origin master");
                break;
            }
            case GitCommand.UndoReadMe: {
                this.RunGitCommand(workingDirPath, "checkout -- " + targetReadMeFileName);
                break;
            }
            default: {
                //TODO: error scenario
                break;
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
