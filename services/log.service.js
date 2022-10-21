import chalk from 'chalk';

function printError(error) {
	console.log(`${chalk.bgRed('ERROR')}: ${error}`);
}

function printSuccess(message) {
	console.log(`${chalk.bgGreen('SUCCESS')}: ${message}`);
}

function printHelp() {
	console.log(`${chalk.bgCyan('HELP')}
Без параметров - вывод погоды
-c [CITY] для установки города
-h [HELP] для вывода помощи
-t [API_KEY] для сохранения токена`);
}

function printWeather(res, icon) {
	console.log(`${chalk.bgYellow('Weather')}
Погода в городе ${res.name}
${icon}    ${res.weather[0].description}
Температура: ${res.main.temp} (ощущается как ${res.main.feels_like})
Влажность: ${res.main.humidity}
Скорость ветра: ${res.wind.speed}`);
}

export { printError, printSuccess, printHelp, printWeather };
