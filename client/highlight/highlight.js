
//highlight

Template.highlight.onCreated(function _OnCreated() {
	this.dispcom = new ReactiveVar();
});
Template.highlight.events({
	'click .updateButton' : function(event, template){
		Meteor.call('contentUpdate',{
			'_id':event.currentTarget.getAttribute('data-id')
			},{
			$set:{'content':document.querySelector(".annotationSpan[data-id="+event.currentTarget.getAttribute('data-id')+"]").innerHTML}
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
	},
	'click .downIt': function(event,template){
		
	},
	'click .upIt': function(event,template){
		
	},
	'click .delete': function(event,template){
		
	}
});
Template.highlight.helpers({
	'mine':function(){
		return(Meteor.userId() == this.creator ? true : false);
	},
	'showComments':function(){
		return(Template.instance().dispcom.get());
	},
	'getComments':function(){
		if(Template.instance().dispcom.get()){
			return(items.find({'type':"dope",'target':this._id,'delete':{$exists:false}}));
		}else{
			return(items.find({'type':"comment",'target':this._id,'delete':{$exists:false}}));
		}
	}
});

