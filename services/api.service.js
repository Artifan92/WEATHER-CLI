import axios from 'axios';

async function getIcon(icon) {
	switch (icon.slice(0, -1)) {
		case '01':
			return '☀️';
		case '02':
			return '⛅️';
		case '03':
			return '🌥';
		case '04':
			return '☁️';
		case '09':
			return '🌧';
		case '10':
			return '🌦';
		case '11':
			return '🌩';
		case '13':
			return '❄️';
		case '50':
			return '🌫';
	}
}

async function getCity(city, token) {
	const { data } = await axios.get(
		'http://api.openweathermap.org/geo/1.0/direct',
		{
			params: {
				q: city,
				limit: 1,
				appid: token,
			},
		},
	);
	const coordinates = data.reduce((acum, curent) => {
		acum.push({ lat: curent.lat, lon: curent.lon });
		return acum;
	}, []);
	return coordinates;
}

async function getWeather(city, token) {
	const coordinates = await getCity(city, token);

	return coordinates.reduce(async (acum, curent) => {
		const { data } = await axios.get(
			'https://api.openweathermap.org/data/2.5/weather',
			{
				params: {
					lat: curent.lat,
					lon: curent.lon,
					appid: token,
					units: 'metric',
					lang: 'ua',
				},
			},
		);
		acum.push(data);
		return acum;
	}, []);
}

export { getWeather, getIcon };
