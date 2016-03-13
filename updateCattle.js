Template.updateCattle.helpers({
  petName: function()
  {
	  var cattle = Session.get('selectedCattle');
	  return cattle.petName;
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
	  return cattle.vid;
  },
  previousVacciName: function()
  {
	  var cattle = Session.get('selectedCattle');
	  return cattle.previousVacciName;
  },
  previousVacciDate: function()
  {
	  var cattle = Session.get('selectedCattle');
	  return cattle.previousVacciDate;
  }
});


Template.updateCattle.events({
  'click [data-action="updateCattle"]': function(event, template) {
  	event.preventDefault();
    
    var vacciName = $('.update-cattle input[name="previousVacciName"]').val();
    var vacciDate = $('.update-cattle input[name="previousVacciDate"]').val();
    
    var selectedCattle = Session.get('selectedCattle');
    selectedCattle.previousVacciName = vacciName;
    selectedCattle.previousVacciDate = vacciDate;
    
    var farmer = Session.get('currentUser');
    var cattleList = farmer.cattle;
    for(i=0; i<cattleList.length;i++)
    {
    	if(selectedCattle.rfid == cattleList[i].rfid)
    	{
    		cattleList[i] = selectedCattle;
    	}
    }
    
    var cattleSize = farmer.cattle.length;
    famer.cattle = cattleList;
        
    //TODO: make another call to determine next vaccination details and update farmer
    Session.set('currentUser', farmer);
    
    
	Meteor.call('updateCattle', farmer,farmer._id, function(error, result) {
		if(result) {
			Router.go('cattleHome');
		}
	});
  }
});