Session.setDefault('role', 'farmer');

Template.login.events({
	'change #role': function(event, template) {
		console.log("inside change");
		var role = $("input[name='role']:checked").val();
	console.log("radio value"+role);
		Session.set('role', role);		
	},

	    
  'click #login': function(event, template) {
  	event.preventDefault();
    
  	var role = $("input[name='role']:checked").val();
  	var userId = $("input[name='userId']").val();
  	var password = $("input[name='password']").val();
    console.log("role"+role+"name "+userId);
	Session.set('currentUser',userId);
    if(role === 'farmer')
    {
    	Meteor.call('retrieveFarmer', userId, function(error, result) {
    		if(result) {
    			var farmer = JSON.parse(results.content);
    			Session.set('currentUser', farmer)
    			Router.go('home'); //TODO: create home page
    		}
    		else
    		{
    			Router.go('home'); //TODO: create route and e
    		}
     
	
  	});
}}
});