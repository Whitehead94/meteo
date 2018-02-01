const e = require('express');
const bp = require('body-parser');
const dl = require('./download.js');
//w3579594@mvrht.net rkXrsqsUQSj5sPSuFtcs
const pl = require('plotly')('w3579594', 'rkXrsqsUQSj5sPSuFtcs');
const m = require('mongoose')
const {MeteoRecord} = require('./models/Record.js');
const PORT = process.env.PORT || 3000;
let app = e();
app.use(bp.json());
app.use(bp.urlencoded({
	extended: true
}));
app.set('view engine', 'hbs');


app.get('/', async function(req, res) {
	
	let result = await MeteoRecord.find();
	
	_x = [];
	_y = [];
	result.forEach((r)=>{
		_x.push(r["date"]);
		_y.push(r["ozone"]);
	});
	
	let data = [{
		x:_x,
		y:_y,
		type: 'scatter'
	}];
	let layout = {
		fileopt : "overwrite",
		filename : "ozon-meteo"
	};
	
	pl.plot(data, layout, function (err, msg) {
		if (err) return console.log(err);
		//console.log(msg);
	});
	
	res.render('index.hbs', {
		//data: _y
	});
});

app.post('/', async function(req, res) {
	
	MeteoRecord.collection.drop();
	
	data = await dl.getData({"resource_id": "a88d7ee2-fc08-41d9-a1c5-befd15c02ea7"})
	
	data["result"]["records"].forEach((r)=>{
		let rec = new MeteoRecord({
			date: r["data"],
			ozone: r["O3"]
		});
		
		rec.save().then((result) => {
		}, (err) => {
			res.status(400).send(err);
		});
	});
	res.render('index.hbs');
});

app.listen(PORT, ()=>{
 	console.log(`server is running on port ${PORT}`);
});