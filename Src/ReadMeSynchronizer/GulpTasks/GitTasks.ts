import * as gulp from "gulp";
import { GitCommit } from "../App/Git/GitRemote";

gulp.task("Git_Commit_ReadMe", () => {
    const gitCommand: GitCommit = new GitCommit;
    gitCommand.CommitReadMes();
});

//////////var gulp = require('gulp');
//////////var git = require('gulp-git');
//////////import { GitCommit } from "../App/Git/GitRemote";
//////////gulp.task("Git_Fetch", () => {
//////////    const gitCommand: GitFetch = new GitFetch;
//////////    gitCommand.FetchRepos();
//////////});
//////////gulp.task("Git_Pull", () => {
//////////    const gitCommand: GitPull = new GitPull;
//////////    gitCommand.PullRepos();
//////////});
