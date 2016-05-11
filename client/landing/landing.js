
let matchArg = []
Template.landing.onCreated(function _OnCreated() {
	this.q = new ReactiveVar();
	this.q.set([]);
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
		template.q.set(matchArg);
	}
});
Template.landing.helpers({
	"foundItem": function(Tempalte){
		return(items.find({'type':{$in:Template.instance().q.get()}}));
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