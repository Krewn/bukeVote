
//itemView
Template.itemView.onCreated(function _OnCreated() {
	this.dispcom = new ReactiveDict();
	this.dispcom.set(this._id,false);
});
Template.itemView.events({
	'click .updateButton' : function(event, template){
		//if(event.target.getAttribute('data-focused')=="true"){
			//alert(document.querySelector(".annotationSpan[data-id='"+event.target.getAttribute('data-id')+"']").innerHTML);
			Meteor.call('contentUpdate',{
				'_id':event.target.getAttribute('data-id')
				},{
				$set:{'content':document.querySelector(".annotationSpan[data-id='"+event.target.getAttribute('data-id')+"']").innerHTML}
			});
			event.stopImmediatePropagation();
		//}
	},
	'click .ShowComments': function(event,template){
		//alert("happens");
		//let temp = template.dispcom.get()?false:true;
		template.dispcom.set(this._id,true);
		event.stopImmediatePropagation();
	},
	'click .HideComments': function(event,template){
		//alert("happens");
		//let temp = template.dispcom.get()?false:true;
		template.dispcom.set(this._id,false);
		event.stopImmediatePropagation();
	},
	'click .newComment': function(event,template){
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
			template.dispcom.set(this._id,true);
			event.stopImmediatePropagation();
		//}
	},
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
		alert(this.type);
		return(this.type=="annotation");
	},
	'contentVote': function(){
		return(this.type=="vote");
	},
	'contentComment': function(){
		return(this.type=="comment");
	},	
	'showComments':function(){
		return(Template.instance().dispcom.get(this._id));
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

