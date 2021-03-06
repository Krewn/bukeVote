
//interactButtons
//I Think the method names would be obscured by comments here...
		
Template.interactButtons.onCreated(function _OnCreated() {
	this.dispcom = new ReactiveDict();
	this.dispcom.set("show:"+this._id,false);
	this.dispcom.set("render:"+this._id,false);
});
Template.interactButtons.events({
	'click .updateButton' : function(event, template){
		if(this.type == "annotation"){
			Meteor.call('contentUpdate',
				{'_id':this._id},
				{$set:{'content':document.querySelector(".annotationSpan[data-id='"+this._id+"']").innerHTML}}
			);
		}else{
			Meteor.call('contentUpdate',
				{'_id':this._id},
				{$set:{'title':document.querySelector(".commentSpan[data-id='"+this._id+"']").innerHTML}}
			);
		}
	},
	'click .ShowComments': function(event,template){
		if(template.dispcom.get("show:"+this._id)){
			template.dispcom.set("show:"+this._id,false);
			Session.set("show:"+this._id,false);
		}else{
			template.dispcom.set("show:"+this._id,true);
			Session.set("show:"+this._id,true);
		}
			event.stopImmediatePropagation();
	},
	'click .render': function(event,template){
		if(template.dispcom.get("render:"+this._id)){
			template.dispcom.set("render:"+this._id,false);
			Session.set("render:"+this._id,false);
		}else{
			template.dispcom.set("render:"+this._id,true);
			Session.set("render:"+this._id,true);
		}
			event.stopImmediatePropagation();
	},
	'click .newComment': function(event,template){
		let commElm = {
			'target': this._id,
			'creator': Meteor.userId(),
			'title': "...",
			'ups': [],
			'downs':[],
			'comments':[],
			'commentViewers':[]
		};
		Meteor.call('insertComment',commElm,this._id);
		template.dispcom.set(this._id,true);
		Session.set("show:"+this._id,true);
	},
	'click .downIt': function(event,template){
		Meteor.call('down',this._id,Meteor.userId());
	},
	'click .upIt': function(event,template){
		Meteor.call('up',this._id,Meteor.userId());
	},
	'click .delete': function(event,template){
		Meteor.call('delete',this._id);
	},
	'click .GetURL': function(event,template){
		let itemUrl = window.location.origin+"/"+this._id
		window.open(itemUrl);
	}
});
Template.interactButtons.helpers({
	'isUsersComment': function(){
		return(Meteor.userId() == this.creator ? true : false);
	},
	'likes': function(){
		return(this.ups.length);
	},
	'dislikes': function(){
		return(this.downs.length);
	}
});

