
//comment

Template.comment.onCreated(function _OnCreated() {
	this.dispcom = new ReactiveDict();
	this.dispcom.set(this._id,false);
});
Template.comment.events({
	'click .commentUpdateButton' : function(event, template){
		//if(event.target.getAttribute('data-focused')=="true"){
			//alert(document.querySelector(".commentSpan[data-id='"+event.target.getAttribute('data-id')+"']").innerHTML);
			Meteor.call('contentUpdate',{
				'_id':event.target.getAttribute('data-id')
				},{
				$set:{'title':document.querySelector(".commentSpan[data-id='"+event.target.getAttribute('data-id')+"']").innerHTML}
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
		alert("cmt");
		//let temp = template.dispcom.get()?false:true;
		template.dispcom.set(this._id,false);
		event.stopImmediatePropagation();
	},
	'click .newCommentc': function(event,template){
		alert(this._id);
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

