import dayjs from 'dayjs';

export const enum LogLevel {
  Error,
  Warn,
  Info,
  Debug,
  Trace,
}

type LogFn = (...messages: any[]) => void;

export interface Logger {
  trace: LogFn;
  debug: LogFn;
  log: LogFn;
  warn: LogFn;
  error: LogFn;
}

export class ConsoleLogger implements Logger {
  protected readonly logLevelLogFnMap: Record<LogLevel, LogFn | null>;
  protected readonly logLevelNameMap: Record<LogLevel, string> = {
    [LogLevel.Trace]: 'TRC',
    [LogLevel.Debug]: 'DBG',
    [LogLevel.Info]: 'INF',
    [LogLevel.Warn]: 'WRN',
    [LogLevel.Error]: 'ERR',
  };

  constructor(protected readonly logLevel: LogLevel = LogLevel.Info) {
    this.logLevelLogFnMap = {
      [LogLevel.Trace]: logLevel >= LogLevel.Trace ? console.trace : null,
      [LogLevel.Debug]: logLevel >= LogLevel.Debug ? console.info : null,
      [LogLevel.Info]: logLevel >= LogLevel.Info ? console.info : null,
      [LogLevel.Warn]: logLevel >= LogLevel.Warn ? console.warn : null,
      [LogLevel.Error]: logLevel >= LogLevel.Error ? console.error : null,
    };
  }

  trace(...messages: any[]) {
    this._log(messages, LogLevel.Trace);
  }

  debug(...messages: any[]) {
    this._log(messages, LogLevel.Debug);
  }

  log(...messages: any[]) {
    this._log(messages, LogLevel.Info);
  }

  warn(...messages: any[]) {
    this._log(messages, LogLevel.Warn);
  }

  error(...messages: any[]) {
    this._log(messages, LogLevel.Error);
  }

  protected _log(messages: any[], logLevel: LogLevel) {
    const logFn = this.logLevelLogFnMap[logLevel];
    if (!logFn) return;

    const logName = this.logLevelNameMap[logLevel];
    const timestamp = dayjs().format('hh:mm:ss');

    if (messages.length > 1) {
      console.group(`[${timestamp} ${logName}]`);
      logFn?.(messages.join('\n'));
      console.groupEnd();
    } else {
      logFn(`[${timestamp} ${logName}] ${messages[0]}`);
    }
  }
}
