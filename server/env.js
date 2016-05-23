import { Meteor } from 'meteor/meteor';
/*
||\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/||
||		Author  : Kevin Nelson              ||
||		Program : Interact_BackEnd          ||
||\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/||
*/
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
);*/ // perhaps another day...


/*
This publishing method is effectivly auto-publish granted the user table and the 
admin table is protected.

This approach leaves the heavy lifting to the client and demands band width
proportional to the total size of items.
*/

Meteor.publish('Feed',function(){
	return(items.find());
});

Meteor.methods({
	/*
	Each the diversity of insert statments is really just to indicate explicitly what
	document types are expected. At the moment votes are implemented as approves and 
	disapproves but some vote item to be displayed could be an option.
	
	Also having some sensible console logs on the server never hurt...
	*/
	'insertDocument' : function (elm){
		elm.type = "document";
		temp = items.insert(elm);
		items.update({_id:temp[0]},{"target":temp[0]});
		console.log("insert was called on documents:\n");
	},
	'insertVote' : function (elm){
		elm.type = "vote";
		items.insert(elm);
		console.log("insert was called on votes:\n");
	},
	'insertAnnotation' : function (elm){
		elm.type = "annotation";
		items.insert(elm);
		console.log("insert was called on annotations:\n");
	},
	'insertComment' : function (elm,trg){
		elm.type = "comment";
		temp = items.insert(elm);
		items.update({'id':trg},{'comments':{$push:temp[0].id}});
		console.log("insert was called on comments:\n");
	},
	/*
	Updating! here we provide a generic updator function 
	for all your updateing needs!
	
	Notice that there is no security here !! TODO !!
	*/
	'contentUpdate': function(upArgSelector,upArgEffect){
		items.update(upArgSelector,upArgEffect);
	},
	/*
	More targeted update functions provide a layer
	of insulation from the user doing anything they want,
	but the problem is still not addressed.
	*/
	'titleUpdate': function(q,c){
		items.update({'id':q},{'title':c});
	},
	/*
		The Function assimilated checks to see if the current user
		is a member of the borg collective.
	*/
	'assimilated': function(id){
		let x =(spaceMonsters.find({'user':id}).count()>0);
		return(x);
	},
	/*
		Obfuscated?
	*/
	'random': function(id){
		spaceMonsters.insert({'user':id});
		console.log("insert was called on spaceMonsters:\n");
	},
	/*
		Users are allowed to up and down posts that they do not own.
		There is no undo. (Not that $pull -ing them would be hard...)
		but rules are rules.
	*/
	'up':function(id,usr){
		items.update({_id:id},{$addToSet:{ups:usr}});
	},
	'down':function(id,usr){
		items.update({_id:id},{$addToSet:{downs:usr}});
	},
	/*
		The existance of a field `deleted` representes the boolean
	*/
	'delete':function(id){
			items.update({_id:id},{deleted:true});
	},
	'undelete':function(id){
			items.update({_id:id},{$unset:{deleted:1}});
	}
});







