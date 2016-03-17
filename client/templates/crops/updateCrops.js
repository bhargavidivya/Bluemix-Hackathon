Template.updateCrop.helpers({
  cropName: function()
  {
	  var crop = Session.get('selectedCrop');
	  return crop.cropName;
  },
  area: function()
  {
	  var crop = Session.get('selectedCrop');
	  return crop.area;
  },
  address: function()
  {
	  var crop = Session.get('selectedCrop');
	  return crop.address;
  },
  yieldOld: function()
  {
	  var crop = Session.get('selectedCrop');
	  return crop.cropYield;
  }
});


Template.updateCrop.events({
	'click #update': function(event, template) {
  	event.preventDefault();
    
  	var yields = $("input[name='yield']").val();
    
    var selectedCrop = Session.get('selectedCrop');
    selectedCrop.cropYield = yields;
    
    var farmer = Session.get('loggedInFarmer');
     
    var cropList = farmer.crops;
    for(i=0;i<cropList.length;i++)
    {
    	if(selectedCrop.cropName == cropList[i].cropName)
    	{
    		cropList[i] = selectedCrop;
    	}
    }
    
    farmer.crops = cropList;
        
    Session.set('loggedInFarmer', farmer);
    
    
	Meteor.call('updateFarmer', farmer,farmer._id, function(error, result) {
		if(result) {
			Router.go('cropsHome');
		}
	});
  }
});