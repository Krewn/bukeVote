
let matchArg = [];
let idRef = [];
let highlights = [];

Template.landing.onCreated(function _OnCreated() {
	this.query = new ReactiveVar();
	this.query.set([]);
	this.FileHandle = new ReactiveVar();
	this.FileHandle.set(false);
	const handle = Meteor.subscribe("Feed");
});
Template.landing.events({
	'click #searchButton' : function(event, template) {
		let includeBills = template.find("#BillsSelector").checked;
		let includeComments  = template.find("#CommentsSelector").checked;
		let includeVotes  = template.find("#VotesSelector").checked;
		let includeAnnotations  = template.find("#AnnotationsSelector").checked;
		let searchText = template.find("#searchText").value;
		matchArg = [];
		if(includeBills){
			 matchArg.push("document");
		}
		if(includeComments){
			matchArg.push("comment");
		}
		if(includeVotes){
			matchArg.push("vote");
		}
		if(includeAnnotations){
			matchArg.push("annotation");
		}
		template.query.set(matchArg);
		template.FileHandle.set(false);
	},
	'click .itemButton' : function(event, template){
		template.FileHandle.set(event.currentTarget.getAttribute('data-id'));
		//template.h.set(items.find({'type':"annotation",'usrId':Meteor.userId(),'doc':template.FileHandle.get()}));
	},
	'click .updateButton' : function(event, template){
		template.FileHandle.set(event.currentTarget.getAttribute('data-id'));
	},
	'click .annotatable' : function(event , template){
		    let t = document.getSelection();
			if(t!="" && event.currentTarget.getAttribute('data-type')=="document"){
				let temp = template.FileHandle.get();
				let elm ={
					'target': temp,
					'title':String(t),
					'content':"...",
					'comments':[],
					'creator': Meteor.userId(),
					'scrore':0,
					'tstamp': new Date()
				};
				alert(t);
				Meteor.call('insertAnnotation',elm);
			}
			if(String(event.currentTarget.getAttribute('data-type'))=="annotation"){
				template.FileHandle.set(event.currentTarget.getAttribute('data-id'));
			}
			
	},
	'click .annotationSpan' : function(event, template){
		let qid = event.currentTarget.getAttribute('data-id');
		Meteor.Call("contentUpdate",qid,event.currentTarget.innerHTML);
	}
});
Template.landing.helpers({
	"foundItem": function(Tempalte){
		return(items.find({'type':{$in:Template.instance().query.get()}}));
	},
	"UserFocus": function(Tempalte){
		return(Template.instance().FileHandle.get()!=false);
	},
	"GetFocus": function(){
		//alert("reactive f Valiue:"+Template.instance().FileHandle.get());
		return(items.find({'_id':Template.instance().FileHandle.get()}));
		//return(items.find({'_id':{$exists:1}}));
	},
	"GetMyHighlights":function(){
		return(items.find({'type':"annotation",'creator':Meteor.userId(),'target':Template.instance().FileHandle.get()}));
	},	
	"GetHighlights":function(){
		return(items.find({'type':"annotation",'creator':{$ne: Meteor.userId()},'target':Template.instance().FileHandle.get()}));
	}
});

/*let ret = [];
for( var k in matchArg){
	console.log(k);
	ret.push(items.find({'type':k}));
}*/
//landing
/*let textStripper = function(t){
	gstack=[];
	raw = [];
	starts = [];
	ends = [];
	pairs = [];
	let tagStart = false;
	let tagEnd = false;
	let tmark = 0;
	for (var i = 0, len = t.length; i < len; i++) {
		if(t[i]=="<"){
			tmark = i;
			tagEnd = false;
			tagStart = true;
		}
		if(t[i]=="/"){
			tagEnd = true;
			tagStart = false;
		}
		if(t[i]==">"){
			if(tagEnd){
				pairs.push([[tmark,i],gstack.pop());
				
			}
			if(tagStart){
				gstack.push([tmark,i]);
				tagEnd = false;
				tagStart = false;
			}
		}
	  
		
	}
	
	lol ____ that.
	xmlLeafFinder = /<[^<>\/]*>[a-zA-Z\n\t\s\d\.\r\v]+<\s*[\/][^<>]*>/m
		
};*/
	/*'click #searchButton' : function(event, template) {
		let includeBills = template.find("#BillsSelector").value;
		let includeComments  = template.find("#CommentsSelector").value;
		let includeVotes  = template.find("#VotesSelector").value;
		let includeAnnotations  = template.find("#AnnotationsSelector").value;
		let searchText = template.find("#searchText").value;
		let matchArg = []
		if(includeBills){matchArg.push("document");}
		if(includeComments){matchArg.push("comment");}
		if(includeVotes){matchArg.push("vote");}
		if(includeAnnotations){matchArg.push("annotation");}
		let PipeLine = [
			{$match : { "type":{$in:matchArg} }},
			{$lookup:
				{
					"from": 'Votes',
					"localField": '_id',
					"foreignField": '_idref',
					"as": 'Content'
				}
			},
			{$lookup:
				{
					"from": 'Documents',
					"localField": '_id',
					"foreignField": '_idref',
					"as": 'content'
				}
			},
			{$lookup:
				{
					"from": 'Annotations',
					"localField": '_id',
					"foreignField": '_idref',
					"as": 'content'
				}
			},
			{$lookup:
				{
					"from": 'Comments',
					"localField": '_id',
					"foreignField": '_idref',
					"as": 'content'
				}
			},
			{ $unwind : "$content" }
		];
		searchText = String(searchText).replace(" ", "|");
		let SearchQuerry = new RegExp(searchText,"i");
		Meteor.subscribe('Feed',PipeLine,SearchQuerry);
	}*/