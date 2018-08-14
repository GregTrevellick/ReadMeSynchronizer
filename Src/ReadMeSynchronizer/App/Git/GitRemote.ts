//var gulp = require('gulp');
//var git = require('gulp-git');

const simpleGit = require('simple-git')('../../../DotNetFlags');

//export class GitFetch {
//    constructor() { }
//    public FetchRepos() { }
//}

//export class GitPull {
//    constructor() { }
//    public PullRepos() { }
//}

export class GitCommit {
    constructor() { }
    public CommitReadMes() {
        //gulp.src('./././DotNetFlags/README.md')
        //    .pipe(git.commit('initial commit readme magic'));
        simpleGit.commit('some magik commit local', 'README.md')
    }
}
