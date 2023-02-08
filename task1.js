#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
  .command(
    'current',
    'set it to know the current date',
    (yargs) => {
      return yargs
        .option('year', {
          alias: 'y',
          type: 'boolean',
          describe: 'get current year',
        })
        .option('month', {
          alias: 'm',
          type: 'boolean',
          describe: 'get current month',
        })
        .option('date', {
          alias: 'd',
          type: 'boolean',
          describe: 'get current day',
        });
    },
    (argv) => {
      if (argv.year) {
        console.log(new Date().getFullYear());
        return;
      }

      if (argv.month) {
        console.log(new Date().getMonth() + 1);
        return;
      }

      if (argv.date) {
        console.log(new Date().getDate());
        return;
      }

      console.log(new Date().toISOString());
    }
  )
  .command(
    'add',
    'get date with adding some amount of days/months/years',
    (yargs) => {
      return yargs
        .option('date', {
          alias: 'd',
          type: 'number',
          describe: 'adding your amount of days to current date',
        })
        .option('month', {
          alias: 'm',
          type: 'number',
          describe: 'adding your amount of months to current date',
        })
        .option('year', {
          alias: 'y',
          type: 'number',
          describe: 'adding your amount of years to current date',
        });
    },
    (argv) => {
      if (argv.date) {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + argv.date);
        console.log(currentDate.toISOString());
        return;
      }

      if (argv.month) {
        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() + argv.month);
        console.log(currentDate.toISOString());
        return;
      }

      if (argv.year) {
        const currentDate = new Date();
        currentDate.setFullYear(currentDate.getFullYear() + argv.year);
        console.log(currentDate.toISOString());
        return;
      }

      console.log(
        'Введите флаг -d, -m, -y и количество дней, месяцев или лет, чтобы добавить их к текущей дате'
      );
    }
  )
  .command(
    'sub',
    'get date with adding some amount of days/months/years',
    (yargs) => {
      return yargs
        .option('date', {
          alias: 'd',
          type: 'number',
          describe: 'substracting your amount of days of current date',
        })
        .option('month', {
          alias: 'm',
          type: 'number',
          describe: 'substracting your amount of months of current date',
        })
        .option('year', {
          alias: 'y',
          type: 'number',
          describe: 'substracting your amount of years of current date',
        });
    },
    (argv) => {
      if (argv.date) {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - argv.date);
        console.log(currentDate.toISOString());
        return;
      }

      if (argv.month) {
        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() - argv.month);
        console.log(currentDate.toISOString());
        return;
      }

      if (argv.year) {
        const currentDate = new Date();
        currentDate.setFullYear(currentDate.getFullYear() - argv.year);
        console.log(currentDate.toISOString());
        return;
      }

      console.log(
        'Введите флаг -d, -m, -y и количество дней, месяцев или лет, чтобы отнять их от текущей даты'
      );
    }
  )
  .help().argv;
