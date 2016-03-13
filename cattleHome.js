Template.cattleHome.events({
    
  'click [data-action="searchCattle"]': function(event, template) {
  	event.preventDefault();
    
    var rfid = $('.cattle-home input[name="rfid"]').val();
    var farmer = Session.get('currentUser');
    var cattleList = farmer.cattle;
    for(i=0; i<cattleList.length;i++)
    {
    	if(rfid == cattleList[i].rfid)
    	{
    		Session.set('selectedCattle',cattleList[i]);
    	}
    }
    Router.go('updateCattle'); 
  }
});