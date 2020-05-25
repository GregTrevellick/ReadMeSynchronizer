// if error "Cannot use simple-git on a directory that does not exist"
// it may be that not all the repos listed in \App\Markdown\RepoNames.ts exist on disc

export enum GitCommand {
    AdHocCommit,
    CommitReadMe,
    PullRepo,
    PushRepo,
    UndoReadMe,
}
