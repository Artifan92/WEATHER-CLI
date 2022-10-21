#!/usr/bin/env node

import getArgs from './helpers/args.js';
import {
	printError,
	printSuccess,
	printHelp,
	printWeather,
} from './services/log.service.js';
import {
	saveKeyValue,
	getKeyValue,
	TOKEN_DICTIONERY,
} from './services/storage.service.js';
import { getWeather, getIcon } from './services/api.service.js';

async function saveToken(token) {
	if (!token.length) {
		printError('Токен отсутствует!');
		return;
	}
	try {
		await saveKeyValue(TOKEN_DICTIONERY.token, token);
		printSuccess('Токен сохранен!');
	} catch (error) {
		printError(error.message);
	}
}

async function saveCity(city) {
	if (!city.length) {
		printError('Город отсутствует!');
		return;
	}
	try {
		await saveKeyValue(TOKEN_DICTIONERY.city, city);
		printSuccess('Город сохранен!');
	} catch (error) {
		printError(error.message);
	}
}

async function getForcast() {
	try {
		const city = await getKeyValue(TOKEN_DICTIONERY.city);
		const token = await getKeyValue(TOKEN_DICTIONERY.token);
		const weather = await getWeather(city, token);
		const icon = await getIcon(weather[0].weather[0].icon);
		printWeather(weather[0], icon);
	} catch (error) {
		if (error?.response?.status == 404) {
			printError('Неверно указан город');
		} else if (error?.response?.status == 401) {
			printError('Неверно указан токен');
		} else {
			printError(error.message);
		}
	}
}

async function initCLI() {
	const args = getArgs(process.argv),
		help = args.h,
		city = args.c,
		token = args.t;

	if (help) {
		printHelp();
	}
	if (city) {
		saveCity(city);
	}
	if (token) {
		saveToken(token);
	}
	getForcast();
}

initCLI();
