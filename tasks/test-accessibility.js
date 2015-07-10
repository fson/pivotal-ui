import gulp from 'gulp';
import a11y from 'a11y';
import {log, colors} from 'gulp-util';

gulp.task('test-accessibility', (done) => {
  a11y('http://styleguide-staging.cfapps.io/elements.html', (err, reports) => {
    let hasErrors;

    for (let el of reports.audit) {
      if (el.result === 'FAIL') {
        log(colors.red('FAIL', el.heading), el.elements.replace(/\n/g, '\n  '));
        hasErrors = true;
      }
      else if (el.result === 'NA') {
        log(colors.yellow('NA', el.heading));
      }
      else {
        log(colors.green('PASS', el.heading));
      }
    }

    if (hasErrors) { done('Google accessibility errors'); }
    else { done(); }
  });
});
