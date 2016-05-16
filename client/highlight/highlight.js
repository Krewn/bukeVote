
//highlight

Template.highlight.onCreated(function _OnCreated() {
	this.dispcom = new ReactiveVar();
	this.ups = new ReactiveVar();
});
Template.highlight.events({
	'click .updateButton' : function(event, template){
		alert(this._id);
		alert(document.querySelector(".annotationSpan[data-id="+event.currentTarget.getAttribute('data-id')+"]").innerHTML);
		Meteor.call('contentUpdate',{
			'_id':event.currentTarget.getAttribute('data-id')
			},{
			$set:{'content':document.querySelector(".annotationSpan[data-id="+event.currentTarget.getAttribute('data-id')+"]").innerHTML}
		});
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
		return(items.find({'type':"comment",'target':this._id}));
	}
});

