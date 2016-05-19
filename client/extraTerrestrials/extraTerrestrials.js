
//extraTerrestrials

Template.extraTerrestrials.onCreated(function _OnCreated() {
	this.auth = new ReactiveVar(); 
});
Template.extraTerrestrials.events({
	'click #MakeItRain' : function(event, template) {
		/*let temp = $.ajax({
			url: "https://www.congress.gov/bill/114th-congress/house-bill/2029",
			type: 'POST',
			dataType: 'json',
			contentType: 'application/json',
			processData: false,
			data: '{"foo":"bar"}',
			success: function (data) {
				alert(JSON.stringify(data));
			},
			error: function(){
				alert("Cannot get data");// <- is alerted...  
			}
		});*/
		
		/*$.get("https://www.congress.gov/bill/114th-congress/house-bill/2029").then(function(responseData) {
		  alert(responseData);
		});*/ //<- No Dice
		

		/*var invocation = new XMLHttpRequest();
		var url = 'https://congress.gov/bill/114th-congress/house-bill/2029';
		var body = '<?xml version="1.0"?><person><name>Arun</name></person>';
			
		function callOtherDomain(){
		  if(invocation)
			{
			  invocation.open('POST', url, true);
			  invocation.setRequestHeader('X-PINGOTHER', 'pingpong');
			  invocation.setRequestHeader('Content-Type', 'application/xml');
			  invocation.onreadystatechange = handler;
			  invocation.send(null); 
			}
		}*/
		
		var request = new XMLHttpRequest();
		request.open('GET', "https://congress.gov/bill/114th-congress/house-bill/2029", true);  // `false` makes the request synchronous
		request.send(null);

		let docDocument = "";
		if (request.status === 200) {
		  alert(request.responseText);
		  docDocument = request.responseText;
		} // <-  Still nothing...  No 'Access-Control-Allow-Origin' header is present on the requested resource.
		
		//Meteor.call("getFrom","https://congress.gov/bill/114th-congress/house-bill/2029");
		
		let docName = "rofl";
		alert(docDocument);
		//let docName = template.find("#inputTitle").innerHTML;
		//let docDocument = template.find("#inputDocument").innerHTML;
		let insDocument = {
			'title':docName,
			'content': docDocument,
			'annotations': [],
			'votes':[],
			'tstamp': new Date()
		};
		Meteor.call('insertDocument',insDocument);
	},
	'click .getColor' : function(event, template){
		alert(Meteor.userId());
		Meteor.call("random",Meteor.userId());
	}
});
Template.extraTerrestrials.helpers({
	"noCreds": function(){
		return(Meteor.user()===null);
	},
	"isAdmin": function(){
		//alert(Meteor.userId());
		Meteor.call("assimilated",Meteor.userId(), function(error, result){
			if(error){
				alert('Error');
			}else{
				Session.set("auth", result);
			}
		});
		return(Session.get("auth"));
	}
});

