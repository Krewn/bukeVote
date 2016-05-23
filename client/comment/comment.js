
//comment
Template.comment.onCreated(function _OnCreated() {
});
Template.comment.events({
});
Template.comment.helpers({
	//not totally dry, I think some of these methods are redundant...
	'isUsersComment': function(){
			return(Meteor.userId() == this.creator ? true : false);
	},
	'showComments':function(){
		return(Session.get("show:"+this._id));
	},
	'getComments':function(){
		if(Session.get("show:"+this._id)){
			return(items.find({'type':"comment",'target':this._id,'delete':{$exists:false}}));
		}else{
			return(items.find({'type':"dope",'target':this._id,'delete':{$exists:false}}));
		}
	}
});

