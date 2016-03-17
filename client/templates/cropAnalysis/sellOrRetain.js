Template.SellOrRetain.helpers({
	  crops: function()
	  {
		var farmer = Session.get('loggedInFarmer');
		var cropsList = JSON.stringify(farmer.crops);
		return cropsList;
	  }
	});