import * as myGulp from "gulp";

export class FileSystemUpdater {
    public replace = require("gulp-string-replace");

    constructor() { }

    public ReplaceBadgeCommentOnDisc(repoFolderName: string, badgesMarkdown: string, badgeCommentStart: string, badgeCommentEnd: string) {

        const destination: string = "../../../" + repoFolderName;

        const source: string = destination + "/README.md";

        const matchAnyCharacter: string = "[^]+";//"don't match no characters" i.e. a double negative that can re-read as "match any character" i.e. even including line breaks

        const badgesRegex = new RegExp(badgeCommentStart + matchAnyCharacter + badgeCommentEnd, "g");

        const options = {
            logs: {
                enabled: false
            }
        };

        myGulp.src([source])
            .pipe(this.replace(badgesRegex, badgesMarkdown, options))
            .pipe(myGulp.dest(destination));
    }
}
