import * as myGulp from 'gulp';

export class FileSystemUpdater {
    public replace = require('gulp-string-replace');

    constructor() { }

    public ReplaceBadgeCommentOnDisc(repoFolderName: string, badgesMarkdown: string, badgeCommentStart: string, badgeCommentEnd: string) {

        let destination: string = "../../../" + repoFolderName;

        let source: string = destination + "/README.md";

        let matchAnyCharacter: string = '[^]+';//"don't match no characters" i.e. a double negative that can re-read as "match any character" i.e. even including line breaks

        let badgesRegex = new RegExp(badgeCommentStart + matchAnyCharacter + badgeCommentEnd, 'g');

        myGulp.src([source])
            .pipe(this.replace(badgesRegex, badgesMarkdown))
            .pipe(myGulp.dest(destination));
    }
}
