Meteor.startup(function () {
 
Meteor.methods({

  "retrieveFarmer": function (userId) {

     console.log("inside method"+userId);
     var url = "http://samplerest.tcs.us-south.mybluemix.net/read?id="+userId;
     console.log("url being hit"+url);
     var response = Meteor.http.get(url);
console.log("status code"+response.statusCode);
	if (response && response.statusCode == 200) {
            return response.data;
        }
        else {
            console.log("Error in farmer data");
        }


},
 
 "updateCattle": function (farmer){

     var url = "http://samplerest.tcs.us-south.mybluemix.net/updateVaccination";  
     console.log("url being hit"+url);
	console.log("farmer in update"+farmer);
	console.log("stringify"+JSON.stringify(farmer));
     var response = Meteor.http.post(url,JSON.stringify(farmer));

	if (response && response.statusCode == 200) {
		console.log("response inside"+JSON.stringify(response));
            return response;
        }
        else {
            console.log("Error in farmer data");    
       } 

   },

"addCattletoDB": function (farmer){

          var url = "http://samplerest.tcs.us-south.mybluemix.net/updateVaccination";  
     console.log("url being hit"+url); 
	console.log("farmer in update"+farmer);
	console.log("stringify"+JSON.stringify(farmer));
     var response = Meteor.http.post(url,JSON.stringify(farmer));  

	if (response && response.statusCode == 200) {
		console.log("response inside"+JSON.stringify(response));
            return response;
        }
        else {
            console.log("Error in farmer data");    
       } 

   },

"updateFarmer": function (farmer,id){
console.log("id "+id);
          var url = "http://samplerest.tcs.us-south.mybluemix.net/update";  
     console.log("url being hit"+url); 
	console.log("farmer in update"+farmer);
	console.log("stringify"+JSON.stringify(farmer));
     var response = Meteor.http.post(url,JSON.stringify(farmer));  

	if (response && response.statusCode == 200) {
		console.log("response inside"+JSON.stringify(response));
            return response;
        }
        else {
            console.log("Error in farmer data");    
       } 

   }

});

});
 