const simpleGit = require('simple-git')('../../../VsixFootie');

export class GitCommit {
    constructor() { }
    public CommitReadMes() {
        simpleGit.commit('some magik commit local', 'README.md')
    }
}

////////////export class GitFetch {
////////////    constructor() { }
////////////    public FetchRepos() { }
////////////}
////////////export class GitPull {
////////////    constructor() { }
////////////    public PullRepos() { }
////////////}
