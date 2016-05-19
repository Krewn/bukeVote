
//comment
/*Tracker.autorun(function(){
	alert("lmao");
	window.scrollTo(0,document.body.scrollHeight);
});*/

Template.comment.onCreated(function _OnCreated() {
	this.dispcom = new ReactiveDict();
	this.dispcom.set(this._id,false);
});
Template.comment.events({
	'click .commentUpdateButton' : function(event, template){
		Meteor.call('contentUpdate',{
			'_id':this._id
			},{
			$set:{'title':document.querySelector(".commentSpan[data-id='"+this._id+"']").innerHTML}
		});
		event.stopImmediatePropagation();
	},
	'click .ShowComments': function(event,template){
		template.dispcom.set(this._id,true);
		event.stopImmediatePropagation();
	},
	'click .HideComments': function(event,template){
		template.dispcom.set(this._id,false);
		event.stopImmediatePropagation();
	},
	'click .newCommentc': function(event,template){
		let commElm = {
			'target': this._id,
			'creator': Meteor.userId(),
			'title': "...",
			'ups': [],
			'downs':[],
			'comments':[]
		};
		Meteor.call('insertComment',commElm,this._id);
		template.dispcom.set(this._id,true);
		event.stopImmediatePropagation();
	}
});
Template.comment.helpers({
	'isUsersComment': function(){
			return(Meteor.userId() == this.creator ? true : false);
	},
	'showComments':function(){
		return(Template.instance().dispcom.get(this._id));
	},
	'getComments':function(){
		if(Template.instance().dispcom.get(this._id)){
			return(items.find({'type':"comment",'target':this._id,'delete':{$exists:false}}));
		}else{
			return(items.find({'type':"dope",'target':this._id,'delete':{$exists:false}}));
		}
	}
});

