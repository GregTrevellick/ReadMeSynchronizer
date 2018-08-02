import * as gulp from 'gulp';
import { ReadMeUpdater } from '../App/UpdateReadmeFiles/update_readme_files';

gulp.task('update_badges_readmes', () => {
    let readMeUpdater: ReadMeUpdater = new ReadMeUpdater;
    readMeUpdater.ReplaceBadgeComments();
});
