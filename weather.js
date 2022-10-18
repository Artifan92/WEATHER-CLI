#!/usr/bin/env node

import getArgs from './helpers/args.js';

function initCLI() {
	const args = getArgs(process.argv);
	console.log(args);
}

initCLI();
