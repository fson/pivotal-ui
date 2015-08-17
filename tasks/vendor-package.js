import {exec} from 'child_process';
import gulp from 'gulp';
import path from 'path';
import {argv} from 'yargs';
import gutil from 'gulp-util';

gulp.task('vendor-package', ['css-build', 'react-build'], (callback) => {
  const {type: componentType, component: componentName, dest} = argv;

  function useVendoredPackageInProject() {
    const originalDirectory = process.cwd();
    process.chdir(dest);

    exec(`npm install --save ${path.join('pui-vendor', componentType, componentName)}`, (error) => {
      if (error) {
        const error = new gutil.PluginError('vendor-package', {message: error});
        gutil.log(error);
      }
      process.chdir(originalDirectory);
      callback();
    });
  }

  gulp.src(`dist/${componentType}/${componentName}/*`)
    .pipe(gulp.dest(`${dest}/pui-vendor/${componentType}/${componentName}`))
    .on('end', useVendoredPackageInProject);
});
