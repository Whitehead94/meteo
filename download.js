const r = require('request');
const err_str = 'Wystąpił błąd przy pobieraniu danych.';

function assembleRequest(resource_id) {
	return 'https://danepubliczne.gov.pl/api/action/datastore_search?resource_id=' + resource_id;
}

function getData(data) {
	return new Promise(function (resolve, reject) {
		
		r(assembleRequest(data["resource_id"]), {json: true}, function (error, response, body) {
			if (error) {
				reject(err_str);
			} else {
				resolve(body);
			}
		});
	});
}

module.exports = {
	getData
};