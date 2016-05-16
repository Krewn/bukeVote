
//comment

Template.comment.onCreated(function _OnCreated() {
	this.dispcom = new ReactiveVar();
	this.dispcom.set(false);
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
		//}
	},
	'click .ShowComments': function(event,template){
		alert("happens");
		let temp = template.dispcom.get()?false:true;
		template.dispcom.set(temp);
	},
	'click .newCommentc': function(event,template){
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
	}
});
Template.comment.helpers({
	'isUsersComment': function(){
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

