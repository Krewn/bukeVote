
//comment
Template.comment.onCreated(function _OnCreated() {

});
Template.comment.events({
	
});
Template.comment.helpers({
	'isUsersComment': function(){
			return(Meteor.userId() == this.creator ? true : false);
	}
});

