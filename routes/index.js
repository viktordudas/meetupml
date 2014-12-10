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
			url: 'https://ussouthcentral.services.azureml.net/workspaces/83d466c703644e079b388d51e04668e2/services/f76e2595f25842a6a6f806d38b6bc4a6/score',
			json: true,
			//        proxy: 'http://127.0.0.1:8888', // FIDDLER
			//        strictSSL:false,
			auth: {
				bearer: 'T3DcWCjPQETcNy5idib7sC4u4ysFmR/Io5oyQjEMYwkuLm4I4WFCESnW0cPSLxDtNW9SJo0+RKBMZPzTyN+/sg=='
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