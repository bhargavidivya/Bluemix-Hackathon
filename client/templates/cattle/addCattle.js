Template.addCattle.events({
  'click #insertCattle': function(event, template) {
  	event.preventDefault();
    
    var newCattle = {
        nickName: $('input[name="petname"]').val(),
        rfid: $('input[name="rfid"]').val(),
        dob: $('input[name="dob"]').val(),
        gender: $('input[name="gender"]').val(),
        vdocid: $('input[name="vid"]').val(),
     };
    
console.log("new cattle"+newCattle);

    var farmer = Session.get('loggedInFarmer');
    var cattleSize = farmer.cattleDetails.length;
    farmer.cattleDetails[cattleSize] = newCattle;
    
    
      Session.set('loggedInFarmer', farmer);
     var id= newCattle.rfid;
var updatedfarmer = {
	"rfid": id,
	"data": farmer
	};

     	console.log("farmer"+JSON.stringify(updatedfarmer));
	Meteor.call('addCattletoDB',updatedfarmer, function(error, result) {
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