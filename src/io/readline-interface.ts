import * as readline from 'readline';

export const createReadlineInterface = () =>
  readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
