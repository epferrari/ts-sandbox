
import {Gulp, TaskFunction} from 'gulp';
import * as assert from 'assert';
import {TaskContext, ContextOptions} from './taskContext';
import {TaskFactory} from './taskFactory';
import * as DefaultRegistry from 'undertaker-registry';

import {cleanClient, cleanServer} from './tasks/clean';
import buildStatics from './tasks/buildStatics';
import * as tslint from './tasks/tsLint';
import * as compiler from './tasks/compiler';
import * as serverTest from './tasks/serverTest';
import * as server from './tasks/server';
import * as devServer from './tasks/devServer';

export class Registry extends DefaultRegistry {

  protected readonly ctx: TaskContext;

  constructor(options: ContextOptions) {
    super();
    assert(typeof options.rootPath === 'string', 'rootPath must be defined in Registry options');
    this.ctx = new TaskContext(options);
  }

  public init (gulp: Gulp) {
    super.init(gulp);

    const {task, parallel, series} = gulp;
    const provide = (factory: TaskFactory<any>): TaskFunction => factory(gulp, this.ctx);

    task('clean:client', provide(cleanClient));
    task('clean:server', provide(cleanServer));
    task('clean', parallel('clean:client', 'clean:server'));
    
    task('statics:build', provide(buildStatics));
    
    task('tslint:tasks', provide(tslint.lintTasks))
    task('tslint:server', provide(tslint.lintServer));
    task('tslint:client', provide(tslint.lintClient));
    task('tslint', parallel('tslint:client', 'tslint:client'));

    task('client:prebuild', parallel('tslint:client', series('clean:client', 'statics:build')));
    task('client:build', series('client:prebuild')); // TODO: webpack here
    task('client:devServer', series('client:prebuild', provide(devServer.serve)));

    task('server:compile', provide(compiler.compileServer));

    task('server:test:single', series(
      'server:compile',
      provide(serverTest.singleRun)
    ));
    
    task('server:test', series(
      parallel('server:test:single', provide(compiler.watchServer)),
      provide(serverTest.continuous)
    ));
    
    task('server:run', parallel(
      'tslint:server',
      parallel(
        provide(compiler.watchServer),
        provide(serverTest.applyHooks)
      ),
      series(
        'clean:server',
        'server:compile',
        provide(server.serve)
      )
    ));
    
    task('dev', parallel('client:devServer', 'server:run'));
    
    task('default', task('dev'));
  }
}


