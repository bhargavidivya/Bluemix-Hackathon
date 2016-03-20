
Template.SellOrRetain.helpers({
	  crops: function()
	  {
		var farmer = Session.get('loggedInFarmer');
		console.log('test1');
		console.log(JSON.stringify(farmer.crops));

var newdate = (new Date()).toLocaleDateString();
 			var res = newdate.split("/");
    			res[2] = res[2].slice(-2);
   			res = res.join("-");
console.log("newdate"+res);



var str = moment().format('ll');
var dates=str.split(" ");
		    var tempres=[dates[1].substring(0,2),dates [0],dates[2].slice("-2")];
			tempres = tempres.join("-");
			console.log("date",tempres);	


		for(i=0;i<farmer.crops.length;i++)
    		{	
			var crop = farmer.crops[i];
			Meteor.call('getPrice', crop.cropName,res,function(error, result) {
			if(result) {
				console.log("pric in"+result.fields);
            		crop.currentPrice = result.fields;	     
 			}
			else
			{
  				 console.log("Null response from Price 					api");
			}
			});

			console.log("price "+	crop.currentPrice);
		
			
			Meteor.call('getPredictedPrice',tempres,function				(error, result) {
			if(result) {
				var response = result.content;
				crop.predictedPrice = response.price;
				console.log("predicted price"+crop.predictedPrice);
            	}	
			else
			{
   				console.log("Null response from Price 					api");
			}
			});


			if(crop.currentPrice > crop.predictedPrice)
			{
				crop.action = "Sell";
			}
			else
			{
				crop.action = "Retain";
			}

		}
		return farmer.crops;

	  }
  });

