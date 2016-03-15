var db = require("./db");
var extend = require('util')._extend;
var Age = require('machinepack-age');
var date = require('date-and-time');
exports.createDocument = function(doc, callback) {
db.getConnection(function(mydb) {
		console.log("mydb value from db is "+mydb);
		mydb.insert(doc, function(err, data) {
			console.log("Error:", err);
			console.log("Data:", data);
			callback(err, data);
		});
	});
};
function readDocument(docname, callback)
{
	console.log("read document invoked with docname "+docname);
	db.getConnection(function(mydb) {
		console.log("mydb value from db is "+mydb);
		mydb.get(docname, function(err, data) {
			console.log("Error:", err);
			console.log("Data:", data);
			callback(err, data);
		});
	});
};
exports.readDocument = readDocument;

exports.updateDocument = function(data,id, callback)
{
	db.getConnection(function(mydb) {
		var doc = readDocument(id,function(err, dbdata){
			if(err)
			{
			console.log("Data retrieval failed");
			}
		else if(dbdata)
			{
			console.log("Data retrieved"+JSON.stringify(dbdata));
			//data.c  = true;
			console.log("mydb value from db is "+mydb);
			var revid = dbdata._rev;
			console.log("Revid from db"+revid);
			delete data['_id'];
			console.log("data before merge"+JSON.stringify(data));
			
			/*for(var dbobj in dbdata)
				{
					for(var uiobj in data)
						{
							if(dbobj === uiobj && data.hasOwnProperty(dbobj))
								{
								console.log(dbobj+"Being modified");
									dbdata[dbobj] = data[uiobj];
								}
						}
				};*/
			console.log("data after merge"+JSON.stringify(dbdata));
			updateJSON(data, revid, id, function(data){
				mydb.insert(data, function(err, data) {
				    console.log("Error:", err);
				    console.log("Data:", data);
				    // keep the revision of the update so we can delete it
				    //doc._rev = data.rev;
				    callback(err, data);
				});
			});
			
			}
	});
		
	});
};

exports.deleteDocument = function(docname, callback)
{
	db.getConnection(function(mydb) {
		
		readDocument(docname, function(err, data){
			if(err)
			{
			console.log("Data read failed");
			}
		else if(data)
			{
			console.log("mydb value from db is "+mydb);
			mydb.destroy(data._id, data._rev, function(err, data) {
				console.log("Error:", err);
				console.log("Data:", data);
				callback(err, data);
			});
			}
	});
		
		
		});
};
function updateJSON(data, revid, id, callback)
{
	var merged = extend({},{"_rev": revid,"_id" : id});
	extend(merged, data);
	console.log("appended data"+JSON.stringify(data));
	console.log("appended mergeddata"+JSON.stringify(merged));
	callback(merged);
};

exports.updateVaccination = function(data, rfid, callback)
{
var cattle = data['CATTLEDETAILS'];
console.log("cattle details from ui"+JSON.stringify(cattle));
var nextVaccine = "";
var nextVaccineTime = "";
var nextVaccineDueDate = "";
var previousVaccine = "";
var prevVaccineDueDate = "";
var cattleAge = 0;
var cattleDOB = "";
for(var i=0; i<cattle.length; i++)
	{
	if(cattle[i].RFID === rfid)
		{
			nextVaccine = cattle[i].PREVIOUSVAC;
			console.log("previousVaccine"+previousVaccine);
			prevVaccineDueDate = cattle[i].PREVIOUSVACDATE;
			console.log("prevVaccineDueDate"+prevVaccineDueDate);
			cattleDOB = cattle[i].DOB;
			console.log("DOB"+cattleDOB);
		}
	}
var currentDate = new Date("DD/MM/YYY");
console.log("Current date"+currentDate);
/*function stringToDate(_date,_format,_delimiter)
{
            var formatLowerCase=_format.toLowerCase();
            var formatItems=formatLowerCase.split(_delimiter);
            var dateItems=_date.split(_delimiter);
            var monthIndex=formatItems.indexOf("mm");
            var dayIndex=formatItems.indexOf("dd");
            var yearIndex=formatItems.indexOf("yyyy");
            var month=parseInt(dateItems[monthIndex]);
            month-=1;
            var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
            return formatedDate;
}
stringToDate(nextVaccineDueDate,"YYYY-MM-DD","/");
stringToDate(cattleDOB,"dd/MM/yyyy","/");*/
console.log("formatted prevVaccineDueDate"+prevVaccineDueDate);
console.log(currentDate > nextVaccineDueDate);
Age.calculate({
	dateOfBirth: cattleDOB, }).exec({// An unexpected error occurred.
		error: function (err){
			 
		},
		// Invalid date format supplied (expected yyyy-mm-dd or instance of Date).
		invalidDateFormat: function (){
		 
		},
		// OK.
		success: function (result){
			console.log("result age"+result);
		 cattleAge  = result/12;
		 console.log("age in months"+cattleAge);
		}
		});
db.getConnection(function(mydb) {
	var doc = readDocument("VACCINATION",function(err, dbdata){
		if(err)
		{
		console.log("Data retrieval failed");
		}
	else if(dbdata)
		{
		console.log("Data retrieved"+JSON.stringify(dbdata));
		for(dbobj in dbdata)
			{
			if(dbobj['VACCINETIME'] >= cattleAge)
				{
				nextVaccine = dbobj['VACCINENAME'];
				nextVaccineTime = cattleAge+dbobj['VACCINETIME'];
				return;
				}
			}
		}
		});
	});
var DOB = date.format(cattleDOB, 'YYYY-MM-DD');
	var nextVaccineDueDate = date.addMonths(DOB, nextVaccineTime);
	console.log("nextVaccineDueDate"+nextVaccineDueDate);
	data['NEXTVAC']	= nextVaccine;
	data['NEXTVACDUE'] = nextVaccineDueDate;
	mydb.insert(data, function(err, data) {
	    console.log("Error:", err);
	    console.log("Data:", data);
	    // keep the revision of the update so we can delete it
	    //doc._rev = data.rev;
	    callback(err, data);
	});
};