/// <binding AfterBuild='default' ProjectOpened='default' />
var gulp = require('gulp');
var bower = require('gulp-bower');//not needed ?

//var replace = require('gulp-replace-in-file');
//var replace = require('replace-in-file');
//const options = {
//    files: '../ReadMe3.md',
//    from: '<!-- Badges START -->',
//    to: '<!-- Badges END -->',
//};

//var replace = require('gulp-replace-task');
var replace = require('gulp-string-replace');

gulp.task('OpenInAbracadabra', function () { return OIAConcat('OpenInAbracadabra', 'Abracadabra') });

gulp.task('default',
    ['OpenInAbracadabra']);

function OIAConcat (appNam, appDesc) { 

    //try {
    //    const changes = replace.sync(options);
    //    console.log('Modified files:', changes.join(', '));
    //}
    //catch (error) {
    //    console.error('Error occurred:', error);
    //}

    //gulp.src('src/index.html')
    //    .pipe(replace({
    //        patterns: [
    //            {
    //                match: 'foo',
    //                replacement: 'bar'
    //            }
    //        ]
    //    }));


 
        gulp.src(["readme4.md"])
            .pipe(replace(new RegExp('This is(.*)sentence', 'g'), 'This isPRODUCTION PRODUCTION sentence'))
            .pipe(gulp.dest('.'))
            ;


    //regex     This is(.*)sentence


    //return gulp
    //    .src(filesToConcat)
    //    .pipe(concat(appNam + '/README.md'))
    //    .pipe(replace('[ThirdPartyApp]', '[' + appDesc + ']'))
    //    .pipe(gulp.dest('.'));
} 
