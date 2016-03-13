Template.nametag.helpers({
  name: function()
  {
	  var farmer = Session.get('currentUser');
	  return farmer.firstName+farmer.LastName;
  },
  stocks: function()
  {
	var farmer = Session.get('currentUser');
	var stocks = JSON.stringify(farmer.stocks);
	return stocks;
  },
  notifications: function()
  {
	var farmer = Session.get('currentUser');
	var notifications = JSON.stringify(farmer.notifications);
	return notifications;
  }
});