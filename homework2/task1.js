#!/usr/bin/env node

const fs = require('fs');
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

/**
 *
 * @returns Random number between 1 and 2
 */
const createRandom = () => {
  return Math.floor(Math.random() * 2 + 1);
};

/**
 *
 * @param {string} fileName - name of file to read and write
 * @param {object} result
 */
const writeFile = (fileName, result) => {
  if (fs.existsSync(fileName)) {
    const readStream = fs.createReadStream(fileName);

    let data = '';
    readStream
      .setEncoding('UTF8')
      .on('data', (chank) => {
        data += chank;
      })
      .on('end', () => {
        const dataFromFile = JSON.parse(data);

        dataFromFile.push(result);

        const writeStream = fs.createWriteStream(fileName);
        writeStream.write(JSON.stringify(dataFromFile));
      });
  } else {
    const results = [result];

    const writeStream = fs.createWriteStream(fileName);

    writeStream.write(JSON.stringify(results));
  }
};

const rl = readline.createInterface({ input, output });

const askQuestion = (fileName) => {
  rl.question('Введите число от 1 до 2: ', (answer) => {
    if (isNaN(+answer) || +answer > 2 || +answer < 1) {
      return;
    }

    const result = createRandom();

    let guess = false;

    if (+answer === result) {
      guess = true;
    }

    const resultOfGame = {
      date: new Date(),
      result: guess,
    };

    writeFile(fileName, resultOfGame);
    rl.close();
  });
};

const argv = yargs(hideBin(process.argv))
  .command(
    'game',
    '',
    (yargs) => {
      return yargs.option('file', {
        alias: 'f',
        type: 'string',
        describe: 'file to read and write',
      });
    },
    (argv) => {
      askQuestion(argv.filename);
    }
  )
  .help().argv;
