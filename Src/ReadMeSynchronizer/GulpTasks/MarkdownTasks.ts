import * as gulp from "gulp";
import { ReadMeUpdater } from "../App/Markdown/UpdateReadMeFiles";

///////////////////////////////{ allowEmpty: true }



//https://github.com/sindresorhus/del/issues/45



gulp.task("Update_Markdown_Badges", () => {
    /////////////////////////////////gulp.src("D:/_Dgit/_MINE_ACTIVE/VstsDashboardWidgetProjectTemplate/README.md ", { allowEmpty: true });
    const readMeUpdater: ReadMeUpdater = new ReadMeUpdater();
    readMeUpdater.ReplaceBadgeComments();
});
