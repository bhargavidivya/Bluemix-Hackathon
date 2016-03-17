Template.registration.events({
	'change [data-action="changeState"]': function(event, template) {
        var items = ['Adilabad', 'Hyderabad', 'Karimnagar', 'Khammam'];
        $.each(items, function (i, item) {
            $('select[name="district"]').append($('<option>', { 
                value: item,
                text : item 
            }));
        });		
	},

	'change [data-action="changeDistrict"]': function(event, template) {
        var items = ['Amberpet', 'Asifnagar', 'Bahadurpura', 'Bandlaguda'];
        $.each(items, function (i, item) {
            $('select[name="block"]').append($('<option>', { 
                value: item,
                text : item 
            }));
        });		
	},    

	'change [data-action="changeBlock"]': function(event, template) {
        var items = ['Charminar', 'Golconda', 'Himayathnagar', 'Shaikpet'];
        $.each(items, function (i, item) {
            $('select[name="village"]').append($('<option>', { 
                value: item,
                text : item 
            }));
        });		
	},    
    
  'click [data-action="submitRegistration"]': function(event, template) {
  	event.preventDefault();
    
    var formData = {
        firstName: $('.farmer-register input[name="firstname"]').val(),
        lastName: $('.farmer-register input[name="lastname"]').val(),
        _id: $('.farmer-register input[name="phonenumber"]').val(),
        age: $('.farmer-register input[name="age"]').val(),
        state: $('.farmer-register select[name="state"] option:selected').text(),
        district: $('.farmer-register select[name="district"] option:selected').text(),
        block: $('.farmer-register select[name="block"] option:selected').text(),
        village: $('.farmer-register select[name="village"] option:selected').text(),
        pinCode: $('.farmer-register input[name="pincode"]').val(),
        aadharId: $('.farmer-register input[name="aadharid"]').val(),
        password: $('.farmer-register input[name="password"]').val()
        
    };
    
    console.info(formData);  
      
	Meteor.call('farmerRegister', formData, function(error, result) {
		if(result) {
			IonPopup.alert({
			  title: 'Done',
			  template: 'Farmer Registered',
			  okText: 'Close',
			  onOk: function(event, template) {
				Router.go('/');
			  }
			});			
		}
	});
  }
});