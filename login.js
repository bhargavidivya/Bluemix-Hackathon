
Session.setDefault('role', 'farmer');

Template.pp-login-form.events({
	'change [data-action="changeRole"]': function(event, template) {
		var role = $('.farmer-register input[name="role"]').val();
		Session.set('role', role);		
	},

	    
  'click [data-action="login"]': function(event, template) {
  	event.preventDefault();
    
  	var role = $('.farmer-register input[name="role"]').val();
  	var userId = $('.farmer-register input[name="userId"]').val();
  	var password = $('.farmer-register input[name="password"]').val();
    
    console.info(role);
    if(role == 'farmer')
    {
    	Meteor.call('retrieveFarmer', userId, function(error, result) {
    		if(result) {
    			var farmer = JSON.parse(results.content);
    			Session.set('currentUser', farmer)
    			Router.go('home'); //TODO: create home page
    		}
    	});
    }
    else
    {
    	Router.go('vhome'); //TODO: create route and page
    }
     
	
  }
});