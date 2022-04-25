const express = require('express');
const port = process.env.PORT || 3000;
const cors = require('cors');
const app = express();
const sqlite3 = require('sqlite3')

let db = new sqlite3.Database('db/us-census.db', err => {
	if(err) throw err
	console.log('database started')
})

app.get('/census', cors(), function (req, res) {
	const request = `SELECT DISTINCT [${req.query.type}], count(*) AS count, ROUND(AVG(age),1) AS average_age FROM census_learn_sql WHERE age IS NOT NULL GROUP BY [${req.query.type}] ORDER BY count DESC`
	db.all(request, (err, data) => {
		console.log(data)
		if(err) {
			return res.json({status_code: 400, data: null, errors: err})
		}
		return res.json({status_code: 200, data, errors: []})
	})
});



app.listen(port, function () {
 console.log('app listening on port ' + port + '!');
});

