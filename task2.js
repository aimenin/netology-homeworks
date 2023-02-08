#!/usr/bin/env node

const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });

const randomNumber = Math.floor(Math.random() * 1000);
const min = randomNumber - Math.floor(Math.random() * 100);
const max = randomNumber + Math.floor(Math.random() * 100);

const askQuestion = (question) => {
  rl.question(question, (answer) => {
    if (isNaN(+answer)) {
      askQuestion('Введите число: ');
    }

    if (+answer === randomNumber) {
      console.log('Отгадано число: ' + answer);
      rl.close();
    }

    if (answer < randomNumber) {
      askQuestion('Больше: ');
    }

    if (answer > randomNumber) {
      askQuestion('Меньше: ');
    }
  });
};

askQuestion(`Загадано число в диапазоне от ${min} до ${max}: `);
