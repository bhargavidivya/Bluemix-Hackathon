Template.cattleHome.events({
    
  'click #searchCattle': function(event, template) {
  	event.preventDefault();
    
    var rfid = $("input[name='rfid']").val();
	console.log("rfid"+rfid);
    var farmer = Session.get('loggedInFarmer');
    var cattleList = farmer.cattleDetails;
    for(i=0; i<cattleList.length;i++)
    {
	console.log("inside for"+cattleList[i].rfid);
    	if(rfid === cattleList[i].rfid)
    	{
    		Session.set('selectedCattle',cattleList[i]);
    	}
    }
    Router.go('updateCattle');  
  }
});