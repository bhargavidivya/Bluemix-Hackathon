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
	/*Session.set('currentUser',userId);*/
	//TODO: authentication
    if(role == 'farmer')
    {
    	console.log('inside farmer');
    	Meteor.call('retrieveFarmer', userId, function(error, result) {
    		console.log('received result');
    		if(result) {
    			console.log('response received'+result+result.firstName);
    			/*var farmer = JSON.parse(result.content);*/
    			Session.set('loggedInFarmer', result);
    			Router.go('home'); //TODO: create home page
    		}
    		else if(error)
    			{alert('response');
    			console.log('error received');
    			console.log(error);
    			}
    		else
    		{
    			Router.go('home'); //TODO: create route and e
    		}
     
	
  	});
    }
    else if(role == "vdoctor")
    {
    	Router.go('vhome'); //TODO: create route and page
    }
    }
});
