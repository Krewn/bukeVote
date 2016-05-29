Template.landing.onCreated(function _OnCreated() {
	this.query = new ReactiveVar();
	this.query.set([]);
	this.FileHandle = new ReactiveVar();
	this.FileHandle.set(false);
	this.expression = new ReactiveVar();
	const handle = Meteor.subscribe("Feed");
	this.FileHandle.set(Session.get("File_Handle_Document_Target_ID_For_Buke_Langing"));	 
	Session.set("File_Handle_Document_Target_ID_For_Buke_Langing",false);
});

Template.landing.onRendered(function _OnCreated() {
	if (this.FileHandle.get()==false || this.FileHandle.get()==null){
		document.getElementById("searchButton").click();
	}
});

Template.landing.events({
	'click #searchButton' : function(event, template) {// CheckBox and Keyword Filter
		let includeBills = template.find("#BillsSelector").checked;
		let includeComments  = template.find("#CommentsSelector").checked;
		let includeVotes  = template.find("#VotesSelector").checked;
		let includeAnnotations  = template.find("#AnnotationsSelector").checked;
		let searchText = string = (template.find("#searchText").textContent===undefined) ? template.find("#searchText").innerText : template.find("#searchText").textContent;
		if(searchText === null || searchText == "KeyWords"){
			searchExpression = new RegExp(/.*/);
		}else{
			searchExpression = new RegExp(searchText.replace(" ","|"));
		}
		let matchArg= [];
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
		template.expression.set(searchExpression);
		template.FileHandle.set(false);
	},
	'click .itemButton' : function(event, template){ // sets the focused document equal to the clicked documet
		template.FileHandle.set(event.currentTarget.getAttribute('data-id'));
	},
	'click .annotatable' : function(event , template){ // .annotatable i.e. the thing you highlight
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
			Meteor.call('insertAnnotation',elm);
			alert("Noted:"+String(t));
		}else{
			if(this.type != "document"){
				template.FileHandle.set(event.currentTarget.getAttribute('data-id'));
			}
		}	
		event.stopImmediatePropagation();
	}
});
Template.landing.helpers({
	"foundItem": function(Tempalte){//gets querry results.
		return(items.find({
			$and:[ 
				{'type':{$in:Template.instance().query.get()}},
				{$or:[
					{content: { $regex: Template.instance().expression.get(), $options: 'i' } },
					{title:   { $regex: Template.instance().expression.get(), $options: 'i' }}
				]}
			]
		}));
	},
	"UserFocus": function(Tempalte){//A boolean to indicate if a single item is selected(true) or if search is being displayed (false)
		return(Template.instance().FileHandle.get()!=false);
	},
	"GetFocus": function(){//gets a single document wrapped in a cursor [elm]
		return(items.find({'_id':Template.instance().FileHandle.get()}));
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
	}*/ // I was thinking about it...