const gulp = require('gulp')
const glob = require('glob')
const chalk = require('chalk');
const replace = require('gulp-replace')

let replaceDocList = glob.sync('./issue/static/js/*/**/*.js');

gulp.task('replaceErrorSrc', function () {
    replaceDocList.forEach((docItem) => {

        let relativeUrl = docItem.split('./issue/static/js/')[1]
        .replace(/[^\/]/g, '')
        .replace(/[\/]/g, '../');

        gulp.src(docItem)
        .pipe(replace('static/img/', (match) => {
            console.log(chalk.yellow(
                `Tip: have replaced one in ${docItem}`
            ))
            return `${relativeUrl}static/img/`;
        }))
        .pipe(gulp.dest(docItem.substr(0, docItem.lastIndexOf('/') + 1)))
    });
})