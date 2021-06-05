import chalk from "chalk";
import moment from "moment";

function logger(
  message: string,
  settings?: { isError?: boolean; appName?: string }
): void {
  if (process.env.NODE_ENV === "test") {
    return;
  }
  const out: Function = settings?.isError ? console.error : console.log;
  out(
    `${chalk.gray(
      `[${moment().format("YYYY-MM-DD HH:mm:ss")}]${
        settings?.appName ? ` [${settings.appName}]` : ``
      }: `
    )}${message}`
  );
}

function debugLogger(message: any, printStack = true): void {
  if (process.env.NODE_ENV === "production") return;
  const stack: string = new Error().stack || "_____UNDEFINED_____";
  logger(
    `${chalk.bgCyan.black(` DEBG `)}${chalk.cyan(
      ` ${message}${printStack ? chalk.gray(stack.slice(7)) : ""}`
    )}`
  );
}

function warn(...message: string[]): void {
  logger(`${chalk.bgYellow.black(` WARN `)} ${chalk.yellow(...message)}`);
}

function error(...message: string[]): void {
  logger(`${chalk.bgRed.black(` ERRR `)} ${chalk.red(...message)}`, {
    isError: true,
  });
}

function info(...message: string[]): void {
  logger(`${chalk.bgWhite.black(` INFO `)} ${chalk.white(...message)}`);
}

function success(...message: string[]): void {
  logger(`${chalk.bgGreen.black(` SUCC `)} ${chalk.green(...message)}`);
}

function clear() {
  if (process.env.NODE_ENV === "test") return;
  console.clear();
}

function setLoggerName(name: string) {
  return {
    debug: (message: any, printStack = true) => {
      if (process.env.NODE_ENV === "production") return;
      const stack: string = new Error().stack || "_____UNDEFINED_____";
      logger(
        `${chalk.bgCyan.black(` DEBG `)}${chalk.cyan(
          ` ${message}${printStack ? chalk.gray(stack.slice(7)) : ""}`
        )}`,
        { appName: name }
      );
    },

    warn: (...message: string[]) => {
      logger(`${chalk.bgYellow.black(` WARN `)} ${chalk.yellow(...message)}`, {
        appName: name,
      });
    },

    error: (...message: string[]) => {
      logger(`${chalk.bgRed.black(` ERRR `)} ${chalk.red(...message)}`, {
        isError: true,
        appName: name,
      });
    },
    info: (...message: string[]) => {
      logger(`${chalk.bgWhite.black(` INFO `)} ${chalk.white(...message)}`, {
        appName: name,
      });
    },
    success: (...message: string[]) => {
      logger(`${chalk.bgGreen.black(` SUCC `)} ${chalk.green(...message)}`);
    },
    plain: logger,
    clear,
  };
}

export default {
  error,
  warn,
  info,
  plain: logger,
  debug: debugLogger,
  success,
  clear,
  customName: setLoggerName,
};
