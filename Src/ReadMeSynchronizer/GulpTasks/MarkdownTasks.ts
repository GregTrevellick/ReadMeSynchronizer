import * as gulp from "gulp";
import { ReadMeUpdater } from "../App/Markdown/UpdateReadMeFiles";

gulp.task("Update_Markdown_Badges", () => {
    const readMeUpdater: ReadMeUpdater = new ReadMeUpdater;
    readMeUpdater.ReplaceBadgeComments();
});
