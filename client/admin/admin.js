
//admin
Template.results.onCreated(function _OnCreated() {

});
Template.admin.events({
	'click #addDocument' : function(event, template) {
		let docName = template.find("#inputTitle").innerHTML;
		let docDocument = template.find("#inputDocument").innerHTML;
		let insDocument = {
			"content": docDocument,
			"annotations": [],
			"votes":[]
		}
		Meteor.call('insertDocument',insDocument);
	}
});
Template.admin.helpers({
	
});

