
//admin
Template.results.onCreated(function _OnCreated() {

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
	}
});
Template.admin.helpers({
	
});

