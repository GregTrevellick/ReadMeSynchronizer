import * as gulp from "gulp";
import { ReadMeUpdater } from "../App/Markdown/UpdateReadMeFiles";

//{ allowEmpty: true }

gulp.task("Update_Markdown_Badges", () => {
    gulp.src([], { allowEmpty: true });
    const readMeUpdater: ReadMeUpdater = new ReadMeUpdater();
    readMeUpdater.ReplaceBadgeComments();
});

//gulp.task('vendor', () =>
//    gulp.src([
//        'node_modules/react/dist/react.min.js',
//        'node_modules/react-dom/dist/react-dom.min.js',
//        'node_modules/react/umd/react.production.min.js',
//        'node_modules/react-dom/umd/react-dom.production.min.js'
//    ], { allowEmpty: true })
//        .pipe(rename(path => path.basename = path.basename.replace(/\.production/, '')))
//        .pipe(gulp.dest('vendor'))
//);