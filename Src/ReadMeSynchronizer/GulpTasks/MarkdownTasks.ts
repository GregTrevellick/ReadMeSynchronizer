import * as gulp from "gulp";
import { ReadMeUpdater } from "../App/Markdown/UpdateReadMeFiles";

gulp.task("Update_Markdown_Badges", function (done) {
    const readMeUpdater: ReadMeUpdater = new ReadMeUpdater();
    readMeUpdater.ReplaceBadgeComments();
    done();
});