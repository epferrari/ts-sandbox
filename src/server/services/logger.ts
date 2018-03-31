import * as Bunyan from 'bunyan';
import {Writable} from 'stream';
import {ChildProcess} from 'child_process';
import * as pkg from '../../../package.json';

export class Logger extends Bunyan {
  public static pipe(child: ChildProcess, scope: string) {
    const {pid} = child;
    const infoStream = new LogStream(pid, 'info', scope);
    const errorStream = new LogStream(pid, 'error', scope);
    child.stdout.pipe(infoStream);
    child.stderr.pipe(errorStream);
  }

  constructor(options: Partial<Bunyan.LoggerOptions> = {}) {
    const level: Bunyan.LogLevel = process.env.LOG_LEVEL as any || 'warn';
    super({
      name: (pkg as any).name,
      level,
      serializers: {
        req: Bunyan.stdSerializers.req,
        res: Bunyan.stdSerializers.res,
        err: Bunyan.stdSerializers.err
      },
      ...options
    });
  }
}

class LogStream extends Writable {
  private logger: Logger = new Logger();
  private pid: number;
  private level: Bunyan.LogLevel;
  private scope: string;

  constructor(
    pid: number,
    level: Bunyan.LogLevel,
    scope: string
  ) {
    super();
    this.pid = pid;
    this.level = level;
    this.scope = scope;
  }

  public _write(chunk: Buffer, encoding: string, done) {
    const {scope, pid} = this;
    this.logger[this.level]({pid, scope}, chunk.toString());
    done();
  }
}

