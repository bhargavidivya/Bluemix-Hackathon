Template.addCattle.events({
  'click [data-action="insertCattle"]': function(event, template) {
  	event.preventDefault();
    
    var newCattle = {
        petName: $('.add-cattle input[name="petname"]').val(),
        rfid: $('.add-cattle input[name="rfid"]').val(),
        dob: $('.add-cattle input[name="dob"]').val(),
        gender: $('.add-cattle input[name="gender"]').val(),
        vid: $('.add-cattle input[name="vid"]').val(),
        previousVacciName: $('.add-cattle input[name="previousVacciName"]').val(),
        previousVacciDate: $('.add-cattle input[name="previousVacciDate"]').val(),
        
    };
    
    var cattleJson = JSON.parse(newCattle);
    var farmer = Session.get('currentUser');
    var cattleSize = farmer.cattle.length;
    famer.cattle[cattleSize+1] = cattleJson;
    
    
    //TODO: make another call to determine next vaccination details and update farmer
    Session.set('currentUser', farmer);
     
	Meteor.call('addCattletoDB', farmer,farmer._id, function(error, result) {
		if(result) {
			Router.go('cattleHome');
		}
	});
  }
});