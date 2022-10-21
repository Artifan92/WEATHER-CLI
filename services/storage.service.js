import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';

const filePath = join(homedir(), '/weather-data.json');

const TOKEN_DICTIONERY = {
	token: 'token',
	city: 'city',
};

async function checkIsExist() {
	let data = {};

	if (await isExist(filePath)) {
		const file = await promises.readFile(filePath);
		data = JSON.parse(file);
		return data;
	}
	return undefined;
}

async function saveKeyValue(key, value) {
	let data = await checkIsExist();
	data = { ...data, [key]: value };
	await promises.writeFile(filePath, JSON.stringify(data));
}

async function getKeyValue(key) {
	const data = await checkIsExist();
	return data[key];
}

async function isExist(path) {
	try {
		await promises.stat(path);
		return true;
	} catch (error) {
		return false;
	}
}

export { saveKeyValue, getKeyValue, TOKEN_DICTIONERY };
