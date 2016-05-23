
//highlight
/*
When a user selects a section of an .annotatable a highlight is created.
Highlights are like comments except they retain the imutable selection 
from which they spawned.
*/
Template.highlight.onCreated(function _OnCreated() {
	
});
Template.highlight.events({
	/*'click .updateButton' : function(event, template){
	Meteor.call('contentUpdate',{
			'_id':event.target.getAttribute('data-id')
			},{
			$set:{'content':document.querySelector(".annotationSpan[data-id='"+event.target.getAttribute('data-id')+"']").innerHTML}
		});
		event.stopImmediatePropagation();
	}*/
});
// 
Template.highlight.helpers({
	'mine':function(){
		return(Meteor.userId() == this.creator ? true : false);
	},
	'showComments':function(){
		return(Session.get("show:"+this._id));
	},
	'getComments':function(){
		return(items.find({'type':"comment",'target':this._id,'delete':{$exists:false}}));
	}
});

