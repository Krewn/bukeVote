
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
		
};*/

Template.landing.onCreated(function _OnCreated() {
	
});
Template.landing.events({
	'click #searchButton' : function(event, template) {
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
			{ $unwind : "$content" },
			{
				$out: "results"
			}
		];
		searchText = String(searchText).replace(" ", "|");
		let SearchQuerry = new RegExp(searchText,"i");
		Meteor.subscribe('Feed',PipeLine,SearchQuerry);
	}
});
Template.landing.helpers({
	
});