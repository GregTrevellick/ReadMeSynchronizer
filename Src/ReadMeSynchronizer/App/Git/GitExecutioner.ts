import { IRepoMetaData } from "../Markdown/IRepoMetaData";
import { RepoCategory } from "../Markdown/RepoCategory";
import { RepoMetaDatas } from "../Markdown/RepoMetaDatas";
import { GitCommand } from "./GitCommand";

export class GitExecutioner {

    private repoMetaDatas: RepoMetaDatas;

    constructor() {
        this.repoMetaDatas = new RepoMetaDatas;
    }

    public GitExecute(gitCommand: GitCommand) {

        for (const repoMetaData of this.repoMetaDatas.repoMetaDatas) {
            this.GitProcessRepo(repoMetaData, gitCommand);
        }
    }

    private GitProcessRepo(repoMetaData: IRepoMetaData, gitCommand: GitCommand) {

        const simpleGit = require("simple-git");
        const targetReadMeFileName = "README.md";
        const workingDirPath: string = "../../../" + repoMetaData.localRepoName;

        switch (gitCommand) {
            case GitCommand.CommitReadMe: {
                if (repoMetaData.repoCategory !== RepoCategory.ReadMeSynchronizer) {
                    const commitMessage = `ReadMeSynchronizer_${gitCommand}`;
                    simpleGit(workingDirPath).commit(commitMessage, targetReadMeFileName);
                }
                break;
            }
            case GitCommand.PullRepo: {
                console.log(workingDirPath);
                simpleGit(workingDirPath).pull("origin", "master");
                break;
            }
            case GitCommand.PushRepo: {
                if (repoMetaData.repoCategory !== RepoCategory.ReadMeSynchronizer) {
                    this.RunGitCommand(workingDirPath, "push origin master");
                }
                break;
            }
            case GitCommand.UndoReadMe: {
                if (repoMetaData.repoCategory !== RepoCategory.ReadMeSynchronizer) {
                    this.RunGitCommand(workingDirPath, "checkout -- " + targetReadMeFileName);
                }
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
        //e.g.
        //git --git-dir=../../../VsixFootie/.git --work-tree=../../../VsixFootie checkout -- README.md
        //git --git-dir=../../../VsixFootie/.git --work-tree=../../../VsixFootie push origin master
        const exec = require("child_process").exec;
        exec(gitCommandExec);
    }
}
