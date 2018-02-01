const m = require('mongoose')
m.Promise = global.Promise;
// 'mongodb://localhost:27017/Meteo'
m.connect('mongodb://meteo:ozone@ds119268.mlab.com:19268/meteo', {
});

let MeteoRecord = m.model('ozone_record', {
	date: {
		type: Date
	},
	ozone: {
		type: Number
	}
});

module.exports = {
	MeteoRecord
};