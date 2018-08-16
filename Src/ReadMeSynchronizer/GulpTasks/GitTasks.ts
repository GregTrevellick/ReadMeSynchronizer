import * as gulp from "gulp";
import { GitCommand } from "../App/Git/GitCommand";
import { GitExecutioner } from "../App/Git/GitExecutioner";

const gitExecutioner: GitExecutioner = new GitExecutioner;

gulp.task("Git_Commit_ReadMe", () => {
    gitExecutioner.GitExecute(GitCommand.CommitReadMe);
});

gulp.task("Git_Pull_Repo", () => {
    gitExecutioner.GitExecute(GitCommand.PullRepo);
});

gulp.task("Git_Push_Repo", () => {
    gitExecutioner.GitExecute(GitCommand.PushRepo);
});

gulp.task("Git_Undo_ReadMe", () => {
    gitExecutioner.GitExecute(GitCommand.UndoReadMe);
});
