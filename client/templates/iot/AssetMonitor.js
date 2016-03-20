Session.setDefault('output', 'Type in RFID of the asset to Monitor.');

Template.assetMonitor.events({
	'click #identifyAsset': function(event, template) {
  	event.preventDefault();
    
  	var rfid = $("input[name='rfid']").val();
      console.log("rfid",rfid);
	Meteor.call('callIoT', rfid, function(error, result) {
		if(result) {
                var out = result.content
			Session.set('output',out.output);
		}
		if(error)
		{
			Session.set('output','Sorry Asset Not Found. Please try again.');
		}
	});
  }
});


Template.assetMonitor.helpers({
	  output: function()
	  {
		  return Session.get('output');
	  }
	});