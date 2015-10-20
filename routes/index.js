var request = require('request');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Meetup ML' });
});


/* GET home page. */
router.post('/nodejsws', function (req, res) {
	//	res.render('index', { title: 'Express' });
	callmaml(req.body, function (result) {
		console.log(req.body);
		res.json(result);
	});

});

module.exports = router;


function callmaml(p, success) {
	request.debug = true;
	
	var fvs = "var fv = { ";
	var k = 1;
	for (i in p) {
		fvs = fvs + (i == 0 ? "" : ", ") + "C" + ("" + (100 + k)).substr(1,2) + ":" + p[i];
		k++;
	}
	fvs += " };";
	eval(fvs);
	
	request.post(
		{
			url: 'https://europewest.services.azureml.net/workspaces/a8e8ae19ee7f412c9e7a1f1553e16849/services/b9a6fea1f6094741bbef94cf7b5e7bc9/score',
			json: true,
			//        proxy: 'http://127.0.0.1:8888', // FIDDLER
			//        strictSSL:false,
			auth: {
				bearer: 'fTpZNXTI9SaKdE7bDL/+hQsFP9Y9kpLJf0anvI3CklUWZTQTthJXWOFSTzZ0m2jsazJM+rRDAWZSlAUBU177Mg=='
			},
			body: {
				Id: "score00001",
				Instance: {
					FeatureVector: fv,
					GlobalParameters: {}
				}
			}
		},
	   function (error, response, body) {
			console.log(error);
			if (!error && response.statusCode == 200) {
				console.log(body);
				success(body);
			}
		}
	);
}