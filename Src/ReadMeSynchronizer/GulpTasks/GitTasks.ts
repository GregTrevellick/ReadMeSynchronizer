import * as gulp from "gulp";
import { GitCommand } from "../App/Git/GitCommand";
import { GitExecutioner } from "../App/Git/GitExecutioner";

const gitExecutioner: GitExecutioner = new GitExecutioner();

gulp.task("Git_AdHocCommit", () => {
    gitExecutioner.GitExecute(GitCommand.AdHocCommit);
});

gulp.task("Git_Commit_ReadMe", () => {
    gitExecutioner.GitExecute(GitCommand.CommitReadMe);
});

gulp.task("Git_Pull_Repos", () => {
    gitExecutioner.GitExecute(GitCommand.PullRepo);
});

gulp.task("Git_Push_Repos", () => {
    gitExecutioner.GitExecute(GitCommand.PushRepo);
});

gulp.task("Git_Undo_ReadMe", () => {
    gitExecutioner.GitExecute(GitCommand.UndoReadMe);
});
