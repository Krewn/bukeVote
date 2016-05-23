
//admin
/*

This file handles the creation and actiosn of Admins.
It also demonstrates lockout on unsigned users.

*/
Template.admin.onCreated(function _OnCreated() {
	this.auth = new ReactiveVar(); 
});
Template.admin.events({
	// This Method adds a document root for commenting in Common
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
	// I hesitate to put the phrase makeAdmin(user) in my code...
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

