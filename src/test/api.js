// api.js
const axios = require("axios");

async function fetchData(url) {
	try {
		const response = await axios.get(url);
		return response.data;
	} catch (error) {
		throw new Error("Error fetching data");
	}
}

module.exports = fetchData;
