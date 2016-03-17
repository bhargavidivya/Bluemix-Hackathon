Template.updateCattle.helpers({
  petName: function()
  {
	  var cattle = Session.get('selectedCattle');
	  return cattle.nickName;
  },
  rfid: function()
  {
	  var cattle = Session.get('selectedCattle');
	  return cattle.rfid;
  },
  dob: function()
  {
	  var cattle = Session.get('selectedCattle');
	  return cattle.dob;
  },
  gender: function()
  {
	  var cattle = Session.get('selectedCattle');
	  return cattle.gender;
  },
  vid: function()
  {
	  var cattle = Session.get('selectedCattle');
	  return cattle.vdocid;
  },
  previousVacciNameOld: function()
  {
	  var cattle = Session.get('selectedCattle');
	  return cattle.previousVac;
  },
  previousVacciDateOld: function()
  {
	  var cattle = Session.get('selectedCattle');
	  var date = cattle.previousVacDate;
	  var newdate = date.split("/").reverse().join("-");  
	 console.log("date"+newdate); 
	  return newdate;
  },
  nextVacciNameOld: function()
  {
	  var cattle = Session.get('selectedCattle');
	  return cattle.nextVac;
  },
  nextVacciDateOld: function()
  {
	  var cattle = Session.get('selectedCattle');
	  return cattle.nextVacDue;
  }

});


Template.updateCattle.events({
  'click #updateCattle': function(event, template) {
  	event.preventDefault();
    
    var vacciName = $('input[name="previousVacciName"]').val();
    var vacciDate = $('input[name="previousVacciDate"]').val();
  var newdate = vacciDate.split("/").reverse().join("-");  

    console.log("vacci date"+vacciDate );
    var selectedCattle = Session.get('selectedCattle');
    selectedCattle.previousVac= vacciName;
    selectedCattle.previousVacDate= vacciDate;
    console.log("after log"+selectedCattle.previousVacDate); 
    var farmer = Session.get('loggedInFarmer');
    var cattleList = farmer.cattleDetails;
    for(i=0; i<cattleList.length;i++)
    {
    	if(selectedCattle.rfid === cattleList[i].rfid)
    	{
    		cattleList[i] = selectedCattle;
    	}
    }
    
    var cattleSize = farmer.cattleDetails.length;
    farmer.cattleDetails= cattleList;
        
    //TODO: make another call to determine next vaccination details and update farmer
    Session.set('loggedInFarmer', farmer);  
    
     var id = selectedCattle.rfid;
	console.log("id"+id);
	var updatedfarmer = {
	"rfid": id,
	"data": farmer
	};
	console.log("updated farmer"+JSON.stringify(updatedfarmer));
	Meteor.call('updateCattle',updatedfarmer,function(error, result) {
		if(result) {
			Router.go('cattleHome');  
		}
		else
		{
			console.log("error caught while updating cattle info");
		}  
	});
  }
});