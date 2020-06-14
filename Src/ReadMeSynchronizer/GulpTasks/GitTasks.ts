import * as gulp from "gulp";
import { GitCommand } from "../App/Git/GitCommand";
import { GitExecutioner } from "../App/Git/GitExecutioner";

const gitExecutioner: GitExecutioner = new GitExecutioner();

gulp.task("Git_AdHocCommit", function (done) {
    gitExecutioner.GitExecute(GitCommand.AdHocCommit);
    done();
});

gulp.task("Git_Clone", function (done) {
    gitExecutioner.GitExecute(GitCommand.Clone);
    done();
});

gulp.task("Git_Commit_ReadMe", function (done) {
    gitExecutioner.GitExecute(GitCommand.CommitReadMe);
    done();
});

gulp.task("Git_Pull_Repos", function (done) {
    gitExecutioner.GitExecute(GitCommand.PullRepo);
    done();
});

gulp.task("Git_Push_Repos", function (done) {
    gitExecutioner.GitExecute(GitCommand.PushRepo);
    done();
});

gulp.task("Git_Undo_ReadMe", function (done) {
    gitExecutioner.GitExecute(GitCommand.UndoReadMe);
    done();
});