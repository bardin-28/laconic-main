
let project_folder = require("path").basename('dist'),
    source_folder = "#src",
    fs = require('fs');
    
let { src, dest } = require('gulp'),
    gulp            = require('gulp'),                            // Сам сборщик Gulp
    plumber         = require('gulp-plumber'),                    // Настройка обработки ошибок в Gulp
    browsersync     = require("browser-sync").create(),           // виртуальный сервер  
    concat          = require('gulp-concat'),               	  // конкатенация (соединение нескольких файлов в один файл JS)
    del             = require("del"),                             // очистка старой сборки
    scss            = require("gulp-sass"),                       // SCSS для проекта
    autoprefixer    = require("gulp-autoprefixer"),               // Пакет расстановки вендорных перфиксов
    clean_css       = require('gulp-clean-css'),                  // Переименование файлов в Gulp
    rename          = require('gulp-rename'),                       
    uglify          = require('gulp-uglify-es').default,          // Минификация JS-файлов
    ttf2woff        = require('gulp-ttf2woff'),
    ttf2woff2       = require('gulp-ttf2woff2'),
    fonter          = require('gulp-fonter');


/* Define paths & directories
 * ========================================================================= */
let path = {
    build: {
        html: project_folder + "/",
        css: project_folder + "/css/",
        js: project_folder + "/scripts/",
        img: project_folder + "/images/",
        fonts: project_folder + "/fonts/",
        libraries: project_folder + "/libraries/"
    },
    src: {
        html: source_folder + "/html/*.html",
        css: source_folder + "/styles/style.scss",
        js: source_folder + "/scripts/*.js",
        img: source_folder + "/images/**/*.*",
        fonts: source_folder + "/fonts/*.ttf",
        libraries: source_folder + "/libraries/**"
    },
    watch: {
        html: source_folder + "/html/*.html",
        css: source_folder + "/styles/**/*.scss",
        js: source_folder + "/scripts/*.js",
        img: source_folder + "/images/*.{jpg,png,svg,gif,ico,webp}"
    },
    clean: "./dist"
}

/* Define paths & directories
 * ========================================================================= */
function browserSyns(params) {
    browsersync.init({
        server: {
            baseDir: "./dist/",
            startPath: "./"
        },
        port: 3005,
        notify: false
    })
}

function html() {
    return src(path.src.html)
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

function css() {
    return src(path.src.css)
        .pipe(
            scss({
                outputStyle: "expanded"
            }))
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 5 versions"],
                cascade: true
            })
        )
        .pipe(dest(path.build.css))
        .pipe(clean_css())
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}

function js() {
    return src(path.src.js)
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(rename({
            extname: ".min.js"
        }))
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}

function scripts_libraries() {
    return gulp.src([
            '#src/libraries/jquery-3.4.1/jquery-3.4.1.min.js',
            // '#src/libraries/bootstrap_4.5.0/dist/js/bootstrap.bundle.min.js',
            '#src/libraries/fullPage-3.0.8/scrolloverflow.min.js',
            '#src/libraries/fullPage-3.0.8/fullpage.min.js',
            '#src/libraries/swiper-5.3.8/swiper.min.js',
            '#src/libraries/blazy-1.8.2/blazy.min.js',
            '#src/libraries/animate/wow.min.js',
            // '#src/libraries/bootstrap/bootstrap.min.scss'
            // '#src/libraries/fancybox-3.5.7/dist/jquery.fancybox.min.js'
            // '#src/libraries/wow/wow.min.js',
            // 'src/vendor/quickaccord.min.js',
            // '#src/vendor/blazy.min.js'
            // 'src/scripts/scripts.js'
        ])
        // .pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        // .pipe(sourcemaps.write('./maps'))
        .pipe(rename('libraries.min.js'))
        .pipe(gulp.dest('dist/scripts/'));
}

function images() {
    return src(path.src.img)
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
}

function fonts() {
    src(path.src.fonts)
        .pipe(ttf2woff())                   // Преобразование шрифтов в WOFF
        .pipe(dest(path.build.fonts));
    return src(path.src.fonts)
        .pipe(ttf2woff2())                  // Преобразование шрифтов в WOFF2
        .pipe(dest(path.build.fonts));
}
function libraries(){
    return src(path.src.libraries)
        .pipe(dest(path.build.libraries))
        .pipe(browsersync.stream())      
}

gulp.task('otf2ttf', function () {
    return src([source_folder + '/fonts/*.otf'])
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(dest(source_folder + '/fonts/'))
})

function fontsStyle(params) {
    let file_content = fs.readFileSync(source_folder + '/styles/utils/_fonts.scss');
    if (file_content == '') {
        fs.writeFile(source_folder + '/styles/utils/_fonts.scss', '', cb);
        return fs.readdir(path.build.fonts, function (err, items) {
            if (items) {
                let c_fontname;
                for (var i = 0; i < items.length; i++) {
                    let fontname = items[i].split('.');
                    fontname = fontname[0];
                    if (c_fontname != fontname) {
                        fs.appendFile(source_folder + '/styles/utils/_fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
                    }
                    c_fontname = fontname;
                }
            }
        })
    }
}

function cb() {} // Нужен для корректной работы

function watchFiles(params) {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
}

function clean(params) {
    return del(path.clean)
}


/* GULP RUN
 * ========================================================================= */

// Register tasks to expose to the CLI
// ------------------------------------------------------------------------- */

let build = gulp.series(clean, gulp.parallel(js, css, html, images, fonts, libraries, scripts_libraries), fontsStyle)
let watch = gulp.parallel(build, watchFiles, browserSyns);

/* -------------------------------------------------------------------------
 * Define default task that can be called by just running `gulp` from cli
 * -------------------------------------------------------------------------
 */ 

exports.fontsStyle = fontsStyle;
exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.libraries = libraries;
exports.build = build;
exports.watch = watch;
exports.default = watch;