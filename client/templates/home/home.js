Template.home.helpers({
  name: function()
  {
	  console.log("farmer " +Session.get('loggedInFarmer'));
	  var farmer = Session.get('loggedInFarmer');  
	  return farmer.firstName+" "+farmer.lastName;
  },
  notifications: function()
  {
	var farmer = Session.get('loggedInFarmer');
	return farmer.notifications; 
  }
});
