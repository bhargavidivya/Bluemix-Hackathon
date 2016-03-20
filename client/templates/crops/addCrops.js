Template.addCrop.events({
	'change #changeState': function(event, template) {
        var items = ['Adilabad', 'Hyderabad', 'Karimnagar', 'Khammam'];
        $.each(items, function (i, item) {
            $('select[name="district"]').append($('<option>', { 
                value: item,
                text : item 
            }));
        });		
	},

	'change #changeDistrict': function(event, template) {
        var items = ['Amberpet', 'Asifnagar', 'Bahadurpura', 'Bandlaguda'];
        $.each(items, function (i, item) {
            $('select[name="block"]').append($('<option>', { 
                value: item,
                text : item 
            }));
        });		
	},    

	'change #changeBlock': function(event, template) {
        var items = ['Charminar', 'Golconda', 'Himayathnagar', 'Shaikpet'];
        $.each(items, function (i, item) {
            $('select[name="village"]').append($('<option>', { 
                value: item,
                text : item 
            }));
        });		
	},    
    
	'click #submit': function(event, template) {
  	event.preventDefault();
  	
  	var crop = $("#changeCrop").val();
  	var area = $("input[name='area']").val();
  	var yields = $("input[name='yield']").val();
  	var state = $("#changeState").val();
  	var district = $("#changeDistrict").val();
  	var block = $("#changeBlock").val();
  	var village = $("#changeVillage").val();
  	var pincode = $("input[name='pincode']").val();
  	
  	console.log('cropName'+crop);
  	console.log('yield'+yields);
    var cropDetail = {
    	cropName: crop,
    	area: area,
        address: village+','+block+','+district+','+state+'-'+pincode,
        cropYield: yields,
    };
    
    var farmer = Session.get('loggedInFarmer');
    var cropsSize = farmer.crops.length;
    farmer.crops[cropsSize] = cropDetail;
    console.log('farmer updated:'+farmer);
    
    Session.set('loggedInFarmer', farmer);
    
  	console.log("updated farmer"+farmer);
	Meteor.call('updateFarmer', farmer, farmer._id, function(error, result) {
		if(result) {
			Router.go('cropsHome');
		}
	});
  }
});

Template.addCrop.helpers({
	  uninsuredCrops: function()
	  {
		var farmer = Session.get('loggedInFarmer');
		var cropsList = farmer.crops;
		var list = "(";
		list = list + "{uninsuredCropName: })";
		var cropsAvailable = [{uninsuredCropName:"Wheat"}, {uninsuredCropName:"Rice"}, {uninsuredCropName:"Cotton"}, {uninsuredCropName:"Sugar Cane"}];
		
		for(var i = 0; i < cropsAvailable.length; i++) {
		    var obj = cropsAvailable[i].uninsuredCropName;
		    for(var j=0;j<cropsList.length;j++)
		    {
		    	if(cropsList[j].cropName == obj) {
				        cropsAvailable.splice(i, 1);

			    }
		    }
		    
		}
		/*console.log('after filetring:'+cropsAvailable);
		
		
		for(i=0; i<cropsAvailable.length;i++)
		{
			var found = false;
			for(j=0;j<cropsList.length;j++)
			{
				if(cropsAvailable[i] == cropsList[j].cropName)
				{
					found = true;
				}
			}
			if(!found)
			{
				list = list + "{uninsuredCropName:";
				list = list + cropsAvailable[i];
				list = list + "},";
			}
		}
		list = list.substring(0, list.length-1);
		list = list + ")"; */
		
		return cropsAvailable;
	  }
	});