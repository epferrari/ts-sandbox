require('ts-node').register({ project: './gulp' });

const gulp = require('gulp');
const childProcesses = [];
const context = {
  registerChildProcess: (child, options = {}) => {
    if(!options.silent) {
      child.stdout.pipe(process.stdout);
      child.stderr.pipe(process.stderr);
    }
    childProcesses.push({child, options});
  }
};
const task = (name, deps = []) =>
  gulp.task(name, deps, require(`./gulp/${name}`).default(gulp, context));

task('clean');
task('transpileServer');
task('copyStatics');
task('devServer', ['transpileServer']);

gulp.task('default', ['clean', 'copyStatics', 'devServer']);

process.on('exit', () => {
  console.log('exiting');
  childProcesses.forEach(p => p.child.kill());
});