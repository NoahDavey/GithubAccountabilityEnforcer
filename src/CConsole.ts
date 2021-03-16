/* eslint-disable no-console */
import chalk from 'chalk';

const success = (message: string) => console.log(chalk.green(message));
const info = (message: string) => console.log(chalk.cyan(message));
const warn = (message: string) => console.log(chalk.yellow(message));
const error = (message: string) => console.log(chalk.red(message));
const custom = (message: string, hexCode: string) => console.log(chalk.hex(hexCode)(message));

const successBg = (message: string) => console.log(chalk.bgGreen(message));
const infoBg = (message: string) => console.log(chalk.bgCyan(message));
const warnBg = (message: string) => console.log(chalk.bgYellow(message));
const errorBg = (message: string) => console.log(chalk.bgRed(message));

const CConsole = {
  success,
  info,
  warn,
  error,
  custom,
  successBg,
  infoBg,
  warnBg,
  errorBg,
};

export default CConsole;
