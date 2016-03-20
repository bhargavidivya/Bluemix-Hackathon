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

   },

	"getPrice": function (name,date){
console.log("id "+name);
console.log("date"+date); 
          var url = "https://data.gov.in/api/datastore/resource.json?resource_id=f6e6eee2-21f9-4e81-a82c-afd7b8d99f64&api-key=23fa3038e95b34b75f0b2c23030e3547&filters[CentreName]=HYDERABAD&filters[DATE]="+date+"&filters[CommodityName]="+name+"&fields=PRICE";  
     console.log("url being hit"+url); 

     var response = Meteor.http.get(url);  

	if (response) {
 			return response.content;

		            }
        else {
            console.log("Error in farmer data");    
       } 

   },

"getPredictedPrice": function (date){
console.log("id "+date);
          var url = "https://palbyp.pmservice.ibmcloud.com/pm/v1?Date="+date;  
     console.log("url being hit"+url); 

     var response = Meteor.http.get(url);  
	response = {content:{"price":"4000"}};
	if (response) {
		            return response;  
        }
        else {
            console.log("Error in farmer data");    
       } 

   },

"callIoT": function (rfid){
      /*    var url = "";  
     console.log("url being hit"+url); 

     var response = Meteor.http.get(url);  */
	var response = {content:{"output":"in"}};
	if (response) {
		console.log("response inside"+JSON.stringify(response));
            return response;
        }
        else {
            console.log("Error in farmer data");    
       } 

   }

});

});
 