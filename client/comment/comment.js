
//comment
Template.comment.onCreated(function _OnCreated() {
	this.dispcom = new ReactiveVar();
});
Template.comment.events({
	'click .commentUpdateButton' : function(event, template){
		alert(document.querySelector(".commentSpan[data-id="+event.currentTarget.getAttribute('data-id')+"]").innerHTML);
		Meteor.call('contentUpdate',{
			'_id':event.currentTarget.getAttribute('data-id')
			},{
			$set:{'title':document.querySelector(".commentSpan[data-id="+event.currentTarget.getAttribute('data-id')+"]").innerHTML}
		});
	},
	'click .ShowComments': function(event,template){
		template.dispcom.set(template.dispcom.get()?false:true);
	},
	'click .newComment': function(event,template){
		let commElm = {
			'target': event.currentTarget.getAttribute('data-id'),
			'creator': Meteor.userId(),
			'title': "...",
			'ups': [],
			'downs':[],
			'comments':[]
		};
		Meteor.call('insertComment',commElm,event.currentTarget.getAttribute('data-id'));
	}
});
Template.comment.helpers({
	'isUsersComment': function(){
			return(Meteor.userId() == this.creator ? true : false);
	},
	'getComments':function(){
		if(Template.instance().dispcom.get()){
			return(items.find({'type':"dope",'target':this._id,'delete':{$exists:false}}));
		}else{
			return(items.find({'type':"comment",'target':this._id,'delete':{$exists:false}}));
		}
	}
});

