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
	console.log("farmer"+JSON.stringify(farmer));
	var notifications = new Array();
	var j=0;
	for(i=0;i<farmer.crops.length;i++)
	{
      	if(farmer.crops[i].notification)
        	{
			notifications[j] = farmer.crops[i].notification;
  			j++;
        	}
      }
      for(i=0;i<farmer.cattleDetails.length;i++)
	{
        if(farmer.cattleDetails[i].notification)
        {

		notifications[j] = farmer.cattleDetails[i].notification;
		j++;
	   }
   		
      }
      console.log("notifications"+notifications);
	return notifications; 
  }
});
