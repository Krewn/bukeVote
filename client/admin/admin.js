
//admin
Template.results.onCreated(function _OnCreated() {
	this.auth = new ReactiveVar(); 
});
Template.admin.events({
	'click #addDocument' : function(event, template) {
		let docName = template.find("#inputTitle").innerHTML;
		let docDocument = template.find("#inputDocument").innerHTML;
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
Template.admin.helpers({
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

