
//itemView
Template.itemView.onCreated(function _OnCreated() {
	this.dispcom = new ReactiveDict();
	this.dispcom.set(this._id,false);
});
Template.itemView.events({
	
});
Template.itemView.helpers({
	'isUsersContent': function(){
		return(Meteor.userId() == this.creator ? true : false);
	},
	'contentDocument': function(){
		return(this.type=="document");
	},
	'contentNotDocument': function(){
		return(this.type=="document");
	},
	'contentAnnotation': function(){
		//alert(this.type);
		return(this.type=="annotation");
	},
	'contentVote': function(){
		return(this.type=="vote");
	},
	'contentComment': function(){
		return(this.type=="comment");
	},	
	'showComments':function(){
		return(Session.get("show:"+this._id));
	},
	"GetMyHighlights":function(){
		return(items.find({'type':"annotation",'creator':Meteor.userId(),'target':this._id}));
	},	
	"GetHighlights":function(){
		return(items.find({'type':"annotation",'creator':{$ne: Meteor.userId()},'target':this._id,'delete':{$exists:false}}));
	},
	"GetMyComments":function(){
		return(items.find({'type':"comment",'creator':Meteor.userId(),'target':this._id}));
	},	
	"GetComments":function(){
		return(items.find({'type':"comment",'creator':{$ne: Meteor.userId()},'target':this._id,'delete':{$exists:false}}));
	},
	"GetMyVotes":function(){
		return(items.find({'type':"vote",'creator':Meteor.userId(),'target':this._id,'delete':{$exists:false}}));
	},	
	"GetVotes":function(){
		return(items.find({'type':"vote",'creator':{$ne: Meteor.userId()},'target':this._id,'delete':{$exists:false}}));
	}
});

