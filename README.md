# Introduction

Unlike vue single-page-application, This webpack configuration can help you build multi-page project, and solve corresponding questions.

# Main Configuration

Every page consists of a html template、 an entry and a vue file.The glob can find all the template and entries to build your peoject,the final html will be named with the name of it's directory.

exapmle:

    home/index.js home/index.html home/index.vue ---> home.html

# Usage

npm install

npm run dev

npm run build

# FAQ

1、Compile slowly when the project becomes heavy.

Add the configuration called 'devDirectoryList' in the 'config/index.js' to solve recompile slowly;

<pre>
dev: {

    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},

    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8081, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    openPage: 'recommend.html',
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false,

    
    devtool: 'cheap-module-eval-source-map',

    cacheBusting: true,

    cssSourceMap: true,

    //开发指定目录(为保证compile速度，目录最多设置5个, list为空则默认compile所有模块)
    devDirectoryList: ['common', 'common/index']HMR
},
</pre>

2、The image in corresponding html can't be found because of the error relative path after building.

the error of path always happens in file which more than one layers of directory.

I have no good idea but to replace the error relative path by using the plugin called 'gulp-replace';if you have a better solution, please make sure to tell me.Here is my email address:sxx594@163.com

<pre>
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
</pre>
