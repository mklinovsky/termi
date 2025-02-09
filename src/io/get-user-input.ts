import chalk from 'chalk';
import * as readline from 'readline';

export function getUserInput(
  rl: readline.Interface,
): Promise<string | undefined> {
  return new Promise((resolve) => {
    rl.question(chalk.yellow('>> '), (input) => {
      resolve(input);
    });
  });
}
