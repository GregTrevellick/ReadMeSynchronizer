import { AllRepoMeta } from "../UpdateReadmeFiles/AllRepoMeta";
import { GitCommand } from "./GitCommand";
//import * as myGulp from "gulp";

export class GitCommit {

    private allRepoMeta: AllRepoMeta;

    constructor() {
        this.allRepoMeta = new AllRepoMeta;
    }

    public GitExe(gitCommand: GitCommand) {

        const commitMessage = `ReadMeSynchronizer_${gitCommand}`;
        const specificTargetFile = 'README.md';

        for (const repoMetaData of this.allRepoMeta.repoMetaDatas) {

            const workingDirPath : string = "../../../" + repoMetaData.localRepoName;
            const simpleGit = require('simple-git');//(workingDirPath);//('../../../VsixFootie');

            //gregt extract below to equiv of "FileSystemUpdater.ts"
            switch (gitCommand) {
                case GitCommand.CleanRepo: {
                    //clean
                    break;
                }
                case GitCommand.CommitReadMe: {
                    simpleGit(workingDirPath).commit(commitMessage, specificTargetFile)
                    break;
                }
                case GitCommand.FetchRepo: {
                    //fetch
                    break;
                }
                case GitCommand.PullRepo: {
                    //pull
                    break;
                }
                case GitCommand.PushReadMe: {
                    //push
                    break;
                }
                case GitCommand.UndoReadMe: {

                    //git --git-dir=../VsixFootie/.git --work-tree=../VsixFootie checkout -- README.md
                   // const cwd2 = workingDirPath + "/.git";
                    const cwd = " --git-dir=" + workingDirPath + "/.git --work-tree=" + workingDirPath + " ";
                    //const rmfilename = " -- " + workingDirPath + "/README.md ";
                    const rmfilename = " -- README.md ";
                    //const source: string = workingDirPath + "/README.md";
         //           var gitoptions = cwd + rmfilename;
                    //var gitoptions = rmfilename;
                    //console.log(gitoptions);
          //          simpleGit(workingDirPath).checkout(gitoptions);
//                    simpleGit(workingDirPath).raw(
//                        [
//                            'git ' + cwd + ' checkout ' + rmfilename
//                        ]);

                    //myGulp.src([source]).pipe(simpleGit(workingDirPath).checkout(rmfilename));

                    var exec = require('child_process').exec;
                    exec('git ' + cwd + ' checkout ' + rmfilename);
                    //myGulp.task('task', function (cb) {
                    //    exec('ping localhost', function (err, stdout, stderr) {
                    //        console.log(stdout);
                    //        console.log(stderr);
                    //        cb(err);
                    //    });
                    //});
                    //myGulp.src('./**/**')
                    //    .pipe(exec('git checkout <%= file.path %> <%= options.customTemplatingThing %>', options))
                    //    .pipe(exec.reporter(reportOptions));

                    break;
                }
                default: {
                    //error
                    break;
                }
            }
        }
    }
}
