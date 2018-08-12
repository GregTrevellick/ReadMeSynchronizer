import * as gulp from 'gulp';
import { ReadMeUpdater } from '../App/UpdateReadmeFiles/UpdateReadMeFiles';

gulp.task('UpdateReadMeBadges', () => {
    let readMeUpdater: ReadMeUpdater = new ReadMeUpdater;
    readMeUpdater.ReplaceBadgeComments();
});
