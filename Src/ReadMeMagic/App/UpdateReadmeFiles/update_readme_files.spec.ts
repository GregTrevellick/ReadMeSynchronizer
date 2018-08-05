/// <reference types="jasmine" />
////////// <reference path="update_readme_files.ts" />

//import * as urf from "./update_readme_files";
import { ReadMeUpdater } from '../../App/UpdateReadmeFiles/update_readme_files';

describe("real test should", () => {
    it("do stuff", () => {

        //arrange
        let expected = "badge1a0badge2bb1badge3ccc2";
        //var sut = new urf.ReadMeUpdater();
        var sut = new ReadMeUpdater();

        //act
        let actual = sut.GetBadgesMarkdown();

        //assert
        expect(expected).toEqual(actual);
    });
});
