var http = require("http");
var port = process.env.PORT || 3000;
var data = "{\"employees\":[{\"firstName\":\"John\", \"lastName\":\"Doe\"},{\"firstName\":\"Anna\", \"lastName\":\"Smith\"},{\"firstName\":\"Peter\", \"lastName\":\"Jones\"}]}";
var Cloudant = require("cloudant");
var userdetails = require("./core/userdetails");
var express = require('express');
var app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.bodyParser());
app.get('/', function(req, resp) {
	console.log("Server.js invoked with blank url");
	resp.writeHead(200, {
		'Content-Type' : 'text/html'
	});
	resp.write("No Query Added");
});
app.get('/read', function(req, resp) {
	console.log("Server.js invoked with read url");
	/*resp.writeHead(200, {
		'Content-Type' : 'text/html'
	});*/
	console.log("document id from request param"+req.params.id);
	userdetails.readDocument(req.query.id, function(err, data) {
		if (err) {
			console.log("Data retrieval failed");
		} else if (data) {
			console.log("Data retrieved", data);
			//resp.write(JSON.stringify(data));
			resp.send(data);
		}
	});
});
app.get('/', function(req, resp) {
	console.log("Server.js invoked with blank url");
	resp.writeHead(200, {
		'Content-Type' : 'text/html'
	});
	resp.write("No Query Added");
});

app.post('/update', function(req, resp) {
	console.log("Server.js invoked with update url");
	var id = req.body._id;
	console.log("JSON object from request"+id);
	resp.writeHead(200, {
		'Content-Type' : 'text/html'
	});
	resp.write("update Query");
	userdetails.updateDocument(req.body, id, function(err, data) {
		if (err) {
			console.log("Data updation failed");
		} else if (data) {
			console.log("Data updated", data);
			resp.write("Data updated" + JSON.stringify(data));
		}
	});
});
app.post('/', function(req, resp) {
	console.log("Server.js invoked with blank url");
	resp.writeHead(200, {
		'Content-Type' : 'text/html'
	});
	resp.write("No Query Added");
});
app.post('/create', function(req, resp) {
	console.log("Server.js invoked with create url");
	resp.writeHead(200, {
		'Content-Type' : 'text/html'
	});
	resp.write("create Query");
	userdetails.createDocument(req.body, function(err, data) {
		if (err) {
			console.log("Data creation failed");
		} else if (data) {
			console.log("document created", data);
			resp.write("document created" + JSON.stringify(data));
		}
	});
});
app.get('/delete', function(req, resp) {
	console.log("Server.js invoked with blank url");
	resp.writeHead(200, {
		'Content-Type' : 'text/html'
	});
	resp.write("No Query Added");
});
app.get('/deleterecord', function(req, resp) {
	console.log("Server.js invoked with delete url");
	resp.writeHead(200, {
		'Content-Type' : 'text/html'
	});
	resp.write("delete Query");
	userdetails.deleteDocument(req.query.id, function(err, data) {
		if (err) {
			console.log("Data deletion failed");
		} else if (data) {
			console.log("Data deleted", data);
			resp.write("Data deleted" + JSON.stringify(data));
		}
	});

});

app.post('/updateVaccination', function(req, resp){
	console.log("update vaccination invoked");
	var rfid = req.body.rfid;
	var data = req.body.data;
	resp.writeHead(200, {
		'Content-Type' : 'text/html'
	});
	resp.write("update vaccination Query");
	userdetails.updateVaccination(data, rfid, function(err, data) {
		if (err) {
			console.log("Data updation failed");
		} else if (data) {
			console.log("Data updated", data);
			resp.write("Data updated" + JSON.stringify(data));
		}
	});
});

app.post('/retrieveNextVaccination', function(req, resp){
	console.log("update vaccination invoked");
	var rfid = req.body.rfid;
	var id = req.body._id;
});

app.listen(port);