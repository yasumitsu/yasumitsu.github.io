#!/usr/bin/env node

const fs = require('fs');
const chalk = require('chalk');
const path = require('path');

const { lstat } = fs.promises;

const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (err, filenames) => {
	if (err) console.log(err);

	const statPromises = filenames.map((filename) => lstat(path.join(targetDir, filename)));

	const allStats = await Promise.all(statPromises);

	for (let stats of allStats) {
		const index = allStats.indexOf(stats);

		stats.isFile() ? console.log(filenames[index]) : console.log(chalk.bold(filenames[index]));
	}
});
