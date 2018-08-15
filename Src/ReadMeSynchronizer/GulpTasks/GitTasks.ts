import * as gulp from "gulp";
import { GitCommit } from "../App/Git/GitRemote";
import { GitCommand } from "../App/Git/GitCommand";

gulp.task("Git_Clean_Repo", () => {
    const gitCommand: GitCommit = new GitCommit;
    gitCommand.GitExe(GitCommand.CleanRepo);
});

gulp.task("Git_Commit_ReadMe", () => {
    const gitCommand: GitCommit = new GitCommit;
    gitCommand.GitExe(GitCommand.CommitReadMe);
});

gulp.task("Git_Fetch_Repo", () => {
    const gitCommand: GitCommit = new GitCommit;
    gitCommand.GitExe(GitCommand.FetchRepo);
});

gulp.task("Git_Pull_Repo", () => {
    const gitCommand: GitCommit = new GitCommit;
    gitCommand.GitExe(GitCommand.PullRepo);
});

gulp.task("Git_Push_ReadMe", () => {
    const gitCommand: GitCommit = new GitCommit;
    gitCommand.GitExe(GitCommand.PushReadMe);
});

gulp.task("Git_Revert_ReadMe", () => {
    const gitCommand: GitCommit = new GitCommit;
    gitCommand.GitExe(GitCommand.RevertReadMe);
});
