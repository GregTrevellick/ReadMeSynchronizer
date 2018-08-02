import * as gulp from 'gulp';
import { Student } from '../App/UpdateReadmeFiles/update_readme_files';

//const run = require("gulp-run");

gulp.task('update_badges_readmes', () => {
    //return run("karma start ./UnitTestConfig/karma.conf.js").exec();
    let student: Student = new Student;
    let abc = student.fullName;
    console.log("abc=" + abc);
});
