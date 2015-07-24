import gulp from 'gulp';
import a11y from 'a11y';
import {split, map, wait} from 'event-stream';
import runSequence from 'run-sequence';
import {log, colors} from 'gulp-util';
import webpack from 'webpack-stream';
import waitTillListening from 'strong-wait-till-listening';
import {spawn} from 'child_process';
import phantomjs from 'phantomjs';

let port = '8000';

gulp.task('set-accessibility-ci-port', (done) => {
  process.env.STYLEGUIDE_PORT = 9002;
  port = '9002';
  done();
});

gulp.task('foobar', () =>
  gulp.src('templates/react-a11y-injectable.js')
    .pipe(webpack({output: {filename: 'react-a11y-script.js'}}))
    .pipe(gulp.dest('tmp/'))
);

gulp.task('accessibility-react-a11y', function(callback) {
  waitTillListening({port, timeoutInMs: 20000}, function() {
    var phantom = spawn(phantomjs.path, ['phantomjs/react_a11y_runner.js']);
    phantom.stdout
      .pipe(split())
      .pipe(map(function(line, callback) {
        if (line.indexOf('REACT-A11Y-ERR') !== -1) {
          callback(null, line);
        } else {
          callback();
        }
      }))
      .pipe(map(function(line, callback) {
        const [id, msg] = line.split(' REACT-A11Y-ERR ');
        log(colors.red('FAIL', id), msg);
        callback(null, line);
      }))
      .pipe(wait(function(err, body) {
        if (err) { log('ERROR:', err); }
        if (!body.length) {
          log(colors.green('PASS No React-a11y errors'));
        }
      }));

    phantom.on('close', function() {
      callback();
    });
    ['SIGINT', 'SIGTERM'].forEach(e => process.once(e, () => phantom && phantom.kill()));
  });
});

gulp.task('accessibility-a11y', (done) => {
  const page = `http://localhost:${port}/react.html`;
  log(`Testing accessibility of ${page}`);

  a11y(page, (err, reports) => {
    if (err) {
      done(err);
      process.exit(1);
    }

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

    if (hasErrors) {
      done('Google accessibility errors');
      process.exit(2);
    }
    else {
      done();
    }
  });
});

gulp.task('accessibility-ci', (done) => runSequence(
  'set-accessibility-ci-port',
  'monolith-serve',
  'accessibility-a11y',
  done
));
