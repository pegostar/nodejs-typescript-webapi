'use strict';

var gulp = require("gulp");
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');
var tslint = require("gulp-tslint");
var sourcemaps = require("gulp-sourcemaps");
var ts = require("gulp-typescript");
var typedoc = require("gulp-typedoc");
var tsProject = ts.createProject("tsconfig.json");

gulp.task("build", function() {

    gulp.src(["./src/**/*.ts", "./typings/index.d.ts", "./typings/custom.d.ts"])
        .pipe(plumber())
        .pipe(sourcemaps.init())
		.pipe(tsProject())
        .pipe(sourcemaps.write(".", {includeContent: false, sourceRoot: "../src"}))
        .pipe(gulp.dest("./bin"));
});

gulp.task("lint", function() {
    return gulp.src([
            "src/**/**.ts"
        ])
        .pipe(plumber())
        .pipe(tslint({}))
        .pipe(tslint.report("verbose"));
});

gulp.task("watch", function () {
    require('events').EventEmitter.prototype._maxListeners = 1000;

    gulp.watch([".src/**/*.ts"], ["build"]).on("change", function (e) {
        console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
    });
});

gulp.task("typedoc", function () {
	return gulp
        .src([".src/**/*.ts"])
        .pipe(typedoc({
        	module: "commonjs",
        	target: "es5",
        	includeDeclarations: true,
			// Output options
        	out: "./docs",
        	json: "output/to/file.json",

        	// TypeDoc options
        	name: "genex-services",
        	ignoreCompilerErrors: true,
        	version: true
        }));
});

gulp.task("default", ["build"]);
