
//highlight

Template.highlight.onCreated(function _OnCreated() {
	this.dispcom = new ReactiveVar();
	this.dispcom.set(false);
});
Template.highlight.events({
	'click .updateButton' : function(event, template){
		//if(event.target.getAttribute('data-focused')=="true"){
			//alert(document.querySelector(".annotationSpan[data-id='"+event.target.getAttribute('data-id')+"']").innerHTML);
			Meteor.call('contentUpdate',{
				'_id':event.target.getAttribute('data-id')
				},{
				$set:{'content':document.querySelector(".annotationSpan[data-id='"+event.target.getAttribute('data-id')+"']").innerHTML}
			});
		//}
	},
	'click .ShowComments': function(event,template){
		//if(event.target.getAttribute('data-focused')=="true"){
			template.dispcom.set(template.dispcom.get()?false:true);
		//}
	},
	'click .newCommenta': function(event,template){
		//if(event.target.getAttribute('data-focused')=="true"){
			let commElm = {
				'target': event.target.getAttribute('data-id'),
				'creator': Meteor.userId(),
				'title': "...",
				'ups': [],
				'downs':[],
				'comments':[]
			};
			Meteor.call('insertComment',commElm,event.target.getAttribute('data-id'));
			template.dispcom.set(true);
		//}
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
			return(items.find({'type':"comment",'target':this._id,'delete':{$exists:false}}));
		}else{
			return(items.find({'type':"dope",'target':this._id,'delete':{$exists:false}}));
		}
	}
});

