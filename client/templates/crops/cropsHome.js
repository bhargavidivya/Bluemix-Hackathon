Template.cropsHome.events({
    
	'click .pp-icon-link': function (event){
		console.log('inside list update');
	    var cropName = event.target.id;
	    console.log('inside list update'+cropName);
	    var farmer = Session.get('loggedInFarmer');
	    var cropList = farmer.crops;
	    for(i=0;i<cropList.length;i++)
	    {
	    	if(cropName == cropList[i].cropName)
	    	{
	    		Session.set('selectedCrop',cropList[i]);
	    	}
	    }
	  }
});


Template.cropsHome.helpers({
	  crops: function()
	  {
		var farmer = Session.get('loggedInFarmer');
		console.log('test1');
		console.log(JSON.stringify(farmer.crops));
		return farmer.crops;
	  }
	});
