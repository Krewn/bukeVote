import { Meteor } from 'meteor/meteor';

Meteor.users.deny({
  update: function() {
    return true;
  }
});


Meteor.startup(() => {
  // code to run on server at startup

});

/*Meteor.publish('Feed',
	function (pipeLine,searchQuerry) {
		ReactiveAggregate(this, keys, pipeLine,{ clientCollection: "results" });
	}
);*/
Meteor.publish('Feed',function(){
	return(items.find());
});


Meteor.methods({
	'insertDocument' : function (elm){
		//temp = keys.insert({"type":"document"});
		//elm._idref = temp[0]._id;
		elm.type = "document";
		items.insert(elm);
		console.log("insert was called on documents:\n");
	},
	'insertVote' : function (elm){
		//temp = keys.insert({"type":"vote"});
		//elm._idref = temp[0]._id;
		elm.type = "vote";
		items.insert(elm);
		console.log("insert was called on votes:\n");
	},
	'insertAnnotation' : function (elm){
		/*temp = keys.insert({"type":"annotation"});
		elm._idref = temp[0]._id;*/
		elm.type = "annotation";
		items.insert(elm);
		console.log("insert was called on annotations:\n");
	},
	'insertComment' : function (elm,trg){
		//temp = keys.insert({"type":"comment"});
		//elm._idref = temp[0]._id;
		elm.type = "comment";
		temp = items.insert(elm);
		items.update({'id':trg},{'comments':{$push:temp[0].id}});
		console.log("insert was called on comments:\n");
	},
	'contentUpdate': function(upArgSelector,upArgEffect){
		items.update(upArgSelector,upArgEffect);
	},
	'titleUpdate': function(q,c){
		items.update({'id':q},{'title':c});
	},
	'assimilated': function(id){
		let x =(spaceMonsters.find({'user':id}).count()>0);
		return(x);
	},
	'random': function(id){
		spaceMonsters.insert({'user':id});
		console.log("insert was called on spaceMonsters:\n");
	},
	'up':function(id,usr){
		
	},
	'down':function(id,usr){
		
	},
	'delete':function(id){
		
	}
});







