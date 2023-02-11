#!/usr/bin/env node

const fs = require('fs');
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

/**
 * Create random number for first task
 * @returns Random number between 1 and 2
 */
const createRandom = () => {
  return Math.floor(Math.random() * 2 + 1);
};

/**
 * Function to read and write file for first task
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

/**
 * Function to ask question for first task
 * @param {string} fileName - name of file to read and write
 */
const askQuestion = (fileName) => {
  const rl = readline.createInterface({ input, output });

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

/**
 * Function to show statistic for second task
 * @param {string} fileName - name of file to read and write
 */
const showStatistic = (fileName) => {
  const readStream = fs.createReadStream(fileName);

  let data = '';
  readStream
    .setEncoding('UTF8')
    .on('data', (chank) => {
      data += chank;
    })
    .on('end', () => {
      const dataFromFile = JSON.parse(data);

      const amountOfGames = dataFromFile.length;
      const wins = dataFromFile.filter((game) => game.result === true).length;
      const loses = dataFromFile.filter((game) => game.result === false).length;
      const percents = (100 / (wins + loses)) * wins;

      console.log('amountOfGames: ' + amountOfGames);
      console.log('wins: ' + wins);
      console.log('loses: ' + loses);
      console.log('percents of winning: ' + percents);

      return;
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
      return;
    }
  )
  .command(
    'stat',
    '',
    (yargs) => {
      return yargs.option('file', {
        alias: 'f',
        type: 'string',
        describe: 'file to read file',
      });
    },
    (argv) => {
      showStatistic(argv.filename);
      return;
    }
  )
  .help().argv;
