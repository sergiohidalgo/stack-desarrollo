'use strict';

/*

Que tareas va a ejecutar gulp?

ok - compilar sus archivos sass y guardar en uno solo
no - compilar los archivos js
no - compilar los pluggin js y css
no - compilar los pluggin ccss y js que se utilizaran en ie explorer
no - Recargar el explorador automaticamente
no - minificar html

*/

//Pluggins Globales
var gulp = require('gulp'),
	concatCss = require('gulp-concat-css'),
	sass = require('gulp-sass'),
	minifyCSS = require('gulp-minify-css'),
	sourcemaps = require('gulp-sourcemaps');

//Compilar sass
gulp.task('sass', function () {
	gulp.src('./css/sass/*.scss')
	.pipe(sourcemaps.init())
	.pipe(sass.sync().on('error', sass.logError))
	.pipe(sourcemaps.write('../maps'))
	.pipe(gulp.dest('./css/sass/css/'))
});

//Escuchar y compilarautomaticamente SASS
gulp.task('sass:watch', function () {
	gulp.watch('./css/sass/*.scss', ['sass', 'unificar']);
});

//Unificar y minificar archivos compilados oir SASS
gulp.task('unificar', function () {
	return gulp.src('./css/sass/css/*.css')
	.pipe(concatCss("all.css"))
	.pipe(minifyCSS())
	.pipe(gulp.dest('css/sass/'));
});

//Ejecutar las tareas
gulp.task('build', ['sass','unificar']);
gulp.task('default', ['build']);
