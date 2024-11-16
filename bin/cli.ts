#!/usr/bin/env node
import calculateWorkingHours from '@@';
import { Option, program } from 'commander';

import packageJson from '../package.json';

program
  .version(packageJson.version)
  .description(packageJson.description)
  .argument('<country>', 'The country code to determine the public holidays')
  .option('-h, --hours', 'The number of working hours in a single working day')
  .option(
    '-m, --month <month>',
    'The month (indexed from 1 to 12) to calculate working hours for. Defaults to the current month'
  )
  .option('-y, --year <year>', 'The year to calculate working hours for. Defaults to the current year')
  .action((country, options) => {
    console.log(options);
    console.log(calculateWorkingHours({ country, ...options }));
  });

['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].forEach(day => {
  program.addOption(new Option(`--with${day}s`, `Whether to include ${day}s as working days`));
  program.addOption(new Option(`--without${day}s`, `Whether to exclude ${day}s from working days`));
});

program.parse(process.argv);
