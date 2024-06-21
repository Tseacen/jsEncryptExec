import chalk from 'chalk';
import ora from 'ora';

export const info = (message: string) => console.log(chalk.blue(message));

export const success = (message: string) => console.log(chalk.green(message));

export const error = (message: string) => console.log(chalk.red(message));

export const startProcess = (message: string) => {
  const spinner = ora(message).start();
  return spinner;
}
export const stopProcess = (spinner: ora.Ora) => spinner.succeed();
