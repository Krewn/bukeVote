
//highlight
/*Tracker.autorun(function(){
	window.scrollTo(0,document.body.scrollHeight);
});*/

Template.highlight.onCreated(function _OnCreated() {
	this.dispcom = new ReactiveDict();
	this.dispcom.set(this._id,false);
});
Template.highlight.events({
	'click .updateButton' : function(event, template){
	Meteor.call('contentUpdate',{
			'_id':event.target.getAttribute('data-id')
			},{
			$set:{'content':document.querySelector(".annotationSpan[data-id='"+event.target.getAttribute('data-id')+"']").innerHTML}
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
	'click .newCommenta': function(event,template){
		let commElm = {
			'target': event.target.getAttribute('data-id'),
			'creator': Meteor.userId(),
			'title': "...",
			'ups': [],
			'downs':[],
			'comments':[]
		};
		Meteor.call('insertComment',commElm,event.target.getAttribute('data-id'));
		template.dispcom.set(this._id,true);
		event.stopImmediatePropagation();
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

